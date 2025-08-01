import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import axios from '../api/axios';

const Songs = ({ mood }) => {
    const [songs, setSongs] = useState([]);
    const audioRefs = useRef([]);
    const [current, setCurrent] = useState(null);

    const togglePlay = (index) => {
        const currentAudio = audioRefs.current[index];

        audioRefs.current.forEach((audio, i) => {
            if (i !== index && audio) audio.pause();
        });

        if (currentAudio.paused) {
            currentAudio.play();
            setCurrent(index);
        } else {
            currentAudio.pause();
            setCurrent(null);
        }
    };

    const getSongs = async () => {
        try {
            const response = await axios.get(`/songs?mood=${mood}`);
            if (response.status === 200) {
                setSongs(response.data.songs);
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    useEffect(() => {
        getSongs();
    }, [mood]);

    return (
        <div className="bg-[#1c1b29] h-[400px] overflow-auto rounded-md shadow-md p-4 w-full border border-purple-500">
            {songs.length > 0 ? (
                <ul className="divide-y divide-gray-700">
                    {songs.map((song, index) => (
                        <li key={index} className="flex items-center justify-between py-3 text-white">
                            <div>
                                <h3 className="font-semibold text-purple-300">{song.title}</h3>
                                <p className="text-sm text-gray-400">{song.artist}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <audio ref={(el) => (audioRefs.current[index] = el)} src={song.audio} />
                                <button
                                    onClick={() => togglePlay(index)}
                                    className="text-purple-400 hover:text-purple-600 transition text-lg"
                                >
                                    {current === index ? <FaPause /> : <FaPlay />}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 text-sm">No songs found for mood: {mood}</p>
            )}
        </div>
    );
};

export default Songs;
