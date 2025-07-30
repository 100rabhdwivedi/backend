import React, { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const Songs = () => {
    const [songs,setSongs] = useState([
        { title: "Sunrise Serenade", artist: "Ava Carter", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { title: "Midnight Groove", artist: "Ethan Blake", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
        { title: "Electric Pulse", artist: "Olivia Hayes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
        { title: "Tranquil Echoes", artist: "Noah Bennett", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
        { title: "Rhythmic Heartbeat", artist: "Sophia Reed", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    ]);

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

    return (
        <div className="h-54 overflow-auto rounded-md shadow-md p-4  w-full">
            <ul className="divide-y">
                {songs.map((song, index) => (
                    <li key={index} className="flex items-center justify-between py-3">
                        <div>
                            <h3 className="font-semibold">{song.title}</h3>
                            <p className="text-sm text-gray-500">{song.artist}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <audio
                                ref={(el) => (audioRefs.current[index] = el)}
                                src={song.url}
                            />
                            <button
                                onClick={() => togglePlay(index)}
                                className="text-gray-700 hover:text-purple-600 transition text-lg"
                            >
                                {current === index ? <FaPause /> : <FaPlay />}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Songs;
