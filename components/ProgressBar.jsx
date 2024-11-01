export default function ProgressBar({ audioRef, progress, setProgress }) {
    const handleProgressChange = (e) => {
      const newProgress = parseFloat(e.target.value);
      setProgress(newProgress);
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    };
  
    return (
        <div className="progress-bar mt-4">
            <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleProgressChange}
            className="progress-slider w-full"
            />
      </div>
    );
  }
  