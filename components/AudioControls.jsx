import { useState } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from "react-icons/fa";
import { MdOutlineRepeatOn, MdOutlineRepeatOneOn } from "react-icons/md";

export default function AudioControls({ audioRef, isPlaying, setIsPlaying, repeat, setRepeat }) {
  const [volume, setVolume] = useState(1); // Anfangslautstärke auf 1 (maximal) setzen

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <div className="controls grid md:grid-cols-4 grid-cols-2 items-center justify-center gap-4 mt-4">
        <button onClick={() => (audioRef.current.currentTime -= 10)}>
          <FaStepBackward className="m-auto" />
        </button>
        <button onClick={togglePlay}>
          {isPlaying ? <FaPause className="m-auto" /> : <FaPlay className="m-auto" />}
        </button>
        <button onClick={() => (audioRef.current.currentTime += 10)}>
          <FaStepForward className="m-auto" />
        </button>
        <button onClick={toggleRepeat}>
          {repeat ? <MdOutlineRepeatOneOn className="m-auto" /> : <MdOutlineRepeatOn className="m-auto" />}
        </button>

        <div className="volume-control mt-4 flex items-center gap-2">
          <FaVolumeUp />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <span>{Math.round(volume * 100)}%</span> {/* Lautstärkewert anzeigen */}
        </div>
      </div>
    </>
  );
}
