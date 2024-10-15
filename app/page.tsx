'use client';

import { useState, useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const [audioFiles, setAudioFiles] = useState<string[]>([]);  // Audio files list
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);  // Current track index
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load the list of audio files from the server on component mount
  useEffect(() => {
    const loadAudioFiles = async () => {
      const response = await fetch('/api/audios');
      const files = await response.json();
      setAudioFiles(files);
    };
    loadAudioFiles();
  }, []);

  // Automatically play the audio when the currentTrackIndex changes or audioFiles are loaded
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement && audioFiles.length > 0) {
      audioElement.src = audioFiles[currentTrackIndex];
      audioElement.play().catch((error: DOMException) => {
        console.error('Error playing audio:', error);
      });
    }
  }, [currentTrackIndex, audioFiles]);

  return (
    <div className="audio-player">
      <h1>Luan yurrrr</h1>
      {audioFiles.length > 0 ? (
        <>
          {/* Audio player controls */}
          <audio ref={audioRef} controls>
            <source src={audioFiles[currentTrackIndex]} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>

          {/* Buttons for previous and next track */}
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

          {/* List of available tracks */}
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {audioFiles.map((file, index) => (
              <li
                key={index}
                style={{
                  padding: '0.5rem',
                  cursor: 'pointer',
                  backgroundColor: index === currentTrackIndex ? '#e0e0e0' : 'transparent',
                }}
                className='text-black text-lg'
                onClick={() => setCurrentTrackIndex(index)}
              >
                {`Track ${index + 1}:  ${file.split('/').pop()}`}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading audio files...</p>
      )}
    </div>
  );
}
