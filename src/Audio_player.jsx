import React from 'react';
import { useRef, useEffect } from 'react';

const AudioPlayer = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        const playAudio = async () => {
            try {
                await audioRef.current.play();
            } catch (err) {
                console.log('Autoplay failed:', err);
            }
        };

        playAudio();
    }, []);

    const playAudio = () => {
        audioRef.current.play();
    };

    const stopAudio = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    const setVolume = (e) => {
        audioRef.current.volume = e.target.value;
    };

    return (
        <div>
            <audio ref={audioRef}>
                <source src="./sounds/infinite_castle.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div>
                <button onClick={playAudio}>Play</button>
                <button onClick={stopAudio}>Stop</button>
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={setVolume}
                    defaultValue="1"
                />
            </div>
        </div>
    );
};

export default AudioPlayer;