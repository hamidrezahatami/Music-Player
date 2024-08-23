import React, { useContext, useEffect, useRef, useState } from 'react';
import MusicsContext from '../context/MusicsContext';
import "../styles/AudioPlayer.css";

const MusicPlayer = ({ id, music, musicSrc, singerName, avatar, musicName, stateFave }) => {
    const musicContext = useContext(MusicsContext);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    
    useEffect(() => {
        const checkEndOfTrack = () => {
            if (audioRef.current) {
                if (audioRef.current.currentTime >= audioRef.current.duration) {
                    musicContext.Playing = false;
                }
            }
        };

        const intervalId = setInterval(checkEndOfTrack, 1000);

        return () => clearInterval(intervalId);
    }, []);


    const handleSeek = (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = e.target.value;
            setCurrentTime(e.target.value);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            audioElement.addEventListener('timeupdate', handleTimeUpdate);
            audioElement.addEventListener('loadedmetadata', () => {
                setDuration(audioElement.duration);
            });

            return () => {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            }
        }
    }, []);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (musicContext.Playing) {
                handlePause();
            } else if (!MusicsContext.Playing && !(audioRef.current.duration < 2) && !(audioRef.current.currentTime === audioRef.current.duration)) {
                if (audioRef.current) {
                    audioRef.current.currentTime -= 2;
                    handlePlay();
                }
            } else {
                handlePlay();
            }
        }
    };

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
            musicContext.Playing = true;
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            musicContext.Playing = false;
        }
    };

    const handleForward = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime += 10);
        }
    };

    const handleBackward = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime -= 10);
        }
    };

    function formatDuration(durationSeconds) {
        const seconds = Math.floor(durationSeconds % 60);
        const minute = Math.floor(durationSeconds / 60);
        const formatSeconds = seconds.toString().padStart(2, '0');
        const formatMinute = minute.toString().padStart(2, '0');
        return `${formatMinute}:${formatSeconds}`;
    }

    return (
        <div className='player-card'>
            <div className="row">
                <div className="col-12 col-md-4">
                    <img src={avatar} style={{objectFit: 'fill', width: '100%', height: 'auto', borderRadius: "5px"}} alt="singerPic" />
                </div>
                <div id='musicInfo' className="col-12 col-md-8 text-light p-5">
                    <div>{singerName}</div>
                    <div>{musicName}</div>
                    <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />
                    <audio ref={audioRef} src={musicSrc}></audio>
                    <div className="track-duration">
                        <p>{formatDuration(currentTime)}</p>
                        <p>{formatDuration(duration)}</p>
                    </div>

                    <div className='btn-container'>
                        <span onClick={handleBackward}><i className="p-3 rounded-circle bi bi-skip-backward-fill"></i></span>
                        <button onClick={handlePlayPause} className={`btn ${musicContext.Playing && currentTime !== duration ? 'btn-success' : 'btn-primary'}`}>
                            {musicContext.Playing === false || currentTime === duration ? (
                                <>
                                    <i className="bi bi-play"></i>
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-pause"></i>
                                </>
                            )}
                        </button>
                        <span id='move' className='text-center'><i className={`bi ${!(musicContext.Playing) && !(currentTime >= duration) ? "" : "bi-music-note"}`}></i></span>
                        <span onClick={handleForward}><i className="p-3 rounded-circle bi bi-skip-forward-fill"></i></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
