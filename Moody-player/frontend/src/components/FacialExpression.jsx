import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Songs from './Songs';

const MODEL_URL = './models';

const FacialExpression = () => {
    const videoRef = useRef(null);
    const [mood, setMood] = useState('');
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [showSongs, setShowSongs] = useState(false);

    useEffect(() => {
        const loadModelsAndCamera = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
            setModelsLoaded(true);

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
            } catch (error) {
                alert("Camera permission is required!");
            }
        };

        loadModelsAndCamera();
    }, []);

    const handleDetectMood = async () => {
        if (!modelsLoaded || !videoRef.current) return;

        const detection = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        if (detection && detection.expressions) {
            const expressions = detection.expressions;
            const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
            const topMood = sorted[0][0];
            setMood(topMood);
            setShowSongs(true); // show song list
        } else {
            setMood('No face detected');
        }
    };

    return (
        <div className="min-h-screen bg-[#f9f6ff] text-gray-800 px-6 py-10">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-3xl font-bold">🎧 Moody Player</h1>
            </header>

            {/* Detection Area */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12">
                <div className="w-[320px] h-[240px] overflow-hidden rounded-lg shadow-md border">
                    <video
                        ref={videoRef}
                        width="320"
                        height="240"
                        autoPlay
                        muted
                        playsInline
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="max-w-sm text-center md:text-left">
                    <h2 className="text-2xl font-semibold mb-2">Live Mood Detection</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Your current mood is being analyzed in real-time. Enjoy music tailored to your feelings.
                    </p>
                    <button
                        onClick={handleDetectMood}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md transition"
                    >
                        Start Listening
                    </button>
                    {mood && (
                        <p className="mt-4 text-lg font-medium">
                            Detected Mood: <span className="font-bold text-purple-600">{mood.toUpperCase()}</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Recommended Songs */}
            {showSongs && (
                <section>
                    <h2 className="text-xl font-bold mb-4">Recommended Tracks</h2>
                    <Songs />
                </section>
            )}
        </div>
    );
};

export default FacialExpression;
