export default function Timestamp({ currentTime, duration }) {
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
  
    return (
      <div className="timestamp">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    );
  }
  