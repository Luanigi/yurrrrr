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
    <div className="audio-player mt-[150px]">
      <h1 className='text-white'>Luan yurrrr</h1>
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
          <div className='grid gap-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 border-white'>
            {audioFiles.map((file, index) => (
              <div
                key={index}
                style={{
                  padding: '0.5rem',
                  cursor: 'pointer',
                  backgroundColor: index === currentTrackIndex ? '#272d36' : 'transparent',
                }}
                className='text-white text-lg border-3 border-white rounded-lg '
                onClick={() => setCurrentTrackIndex(index)}
              >
                {`Track ${index + 1}:  ${file.split('/').pop()}`}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading audio files...</p>
      )}
    </div>
  );
}
