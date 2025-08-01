import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Songs from './Songs';
import { TbLoader2 } from "react-icons/tb";

const MODEL_URL = './models';

const FacialExpression = () => {
    const videoRef = useRef(null);
    const [mood, setMood] = useState('');
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [isDetectingMood, setIsDetectingMood] = useState(false);
    const [showSongs, setShowSongs] = useState(false);

    useEffect(() => {
        const loadModelsAndCamera = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
                setModelsLoaded(true);

                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                alert("Camera permission is required!");
                console.error("Error loading models or accessing camera:", error);
            }
        };

        loadModelsAndCamera();
    }, []);

    const handleDetectMood = async () => {
        if (!modelsLoaded || !videoRef.current) return;

        setIsDetectingMood(true);

        try {
            const detection = await faceapi
                .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            if (detection && detection.expressions) {
                const expressions = detection.expressions;
                const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
                const topMood = sorted[0][0];
                setMood(topMood);
                setShowSongs(true);
            } else {
                setMood('No face detected');
            }
        } catch (error) {
            console.error("Mood detection failed:", error);
            setMood('Detection failed. Try again.');
        } finally {
            setIsDetectingMood(false);
        }
    };

    return (
        <div className="bg-[#0e0d1b] text-white min-h-screen md:h-screen flex flex-col">
            {/* Header */}
            <div className="bg-[#15142b] p-4 flex justify-center items-center border-b border-purple-600">
                <h1 className="text-xl font-bold text-purple-400">🎧 Moody Player</h1>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row flex-1 max-h-full overflow-hidden">
                {/* Left Side - Video & Controls */}
                <div className="md:w-3/4 w-full p-6 flex flex-col">
                    <div className="w-full flex-grow bg-black rounded-lg overflow-hidden">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Controls Below Video */}
                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold text-purple-300 mb-2">Live Mood Detection</h2>
                        <p className="text-sm text-gray-400 mb-4">
                            Your current mood is being analyzed in real-time. Enjoy music tailored to your feelings.
                        </p>

                        <button
                            onClick={handleDetectMood}
                            disabled={!modelsLoaded || isDetectingMood}
                            className={`${modelsLoaded && !isDetectingMood
                                    ? 'bg-purple-600 hover:bg-purple-700'
                                    : 'bg-purple-300'
                                } px-6 py-2 rounded-md text-white transition flex items-center justify-center mx-auto`}
                        >
                            {isDetectingMood ? <TbLoader2 className="animate-spin text-xl" /> : 'Start Listening'}
                        </button>

                        {mood && (
                            <p className="mt-4 text-lg font-medium text-purple-300">
                                Detected Mood: <span className="font-bold text-white">{mood.toUpperCase()}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Side - Songs */}
                <div
                    className="md:w-1/4 w-full p-6 border-t md:border-t-0 md:border-l border-purple-800
                    overflow-y-auto"
                    style={{ maxHeight: 'calc(100vh - 64px)' }} // 64px approx header height
                >
                    {showSongs && (
                        <>
                            <h2 className="text-lg font-bold mb-3 text-purple-400">Recommended Tracks</h2>
                            <Songs mood={mood} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FacialExpression;
