'use client';

import { useState, useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const [audioFiles, setAudioFiles] = useState<string[]>([]);  // Explicit type for audioFiles
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  
  // Use proper typing for audioRef
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load audio files on component mount
  useEffect(() => {
    const loadAudioFiles = async () => {
      const response = await fetch('/api/audios');
      const files = await response.json();
      setAudioFiles(files);
    };
    loadAudioFiles();
  }, []);

  // Play the audio when currentTrackIndex or audioFiles changes
  useEffect(() => {
    const audioElement = audioRef.current;

    // Ensure that audioElement exists and audioFiles is not empty
    if (audioElement && audioFiles.length > 0) {
      audioElement.src = audioFiles[currentTrackIndex];  // Error 1 fixed
      audioElement.play().catch((error: DOMException) => {
        console.error('Error playing audio:', error);
      });
    }
  }, [currentTrackIndex, audioFiles]);

  return (
    <div className="audio-player">
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
