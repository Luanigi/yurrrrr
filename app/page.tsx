'use client';

import { useState, useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  // Lade die Liste der Audiodateien
  useEffect(() => {
    const loadAudioFiles = async () => {
      const response = await fetch('/api/audios');
      const files = await response.json();
      setAudioFiles(files);
    };
    loadAudioFiles();
  }, []);

  // Starte die Wiedergabe des nächsten Tracks, wenn der aktuelle Track endet
  useEffect(() => {
    const handleTrackEnd = () => {
      if (currentTrackIndex < audioFiles.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      }
    };
  }, [currentTrackIndex, audioFiles]);


  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && audioFiles.length > 0) {
      audioElement.src = audioFiles[currentTrackIndex];
      audioElement.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  }, [currentTrackIndex, audioFiles]);

  return (
    <div>
      <h1>Audio Player</h1>
      {audioFiles.length > 0 ? (
        <audio ref={audioRef} controls>
          <source src={audioFiles[currentTrackIndex]} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading audio files...</p>
      )}
      <div>
        <button
          onClick={() => {
            if (currentTrackIndex > 0) setCurrentTrackIndex(currentTrackIndex - 1);
          }}
          disabled={currentTrackIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (currentTrackIndex < audioFiles.length - 1) setCurrentTrackIndex(currentTrackIndex + 1);
          }}
          disabled={currentTrackIndex === audioFiles.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}