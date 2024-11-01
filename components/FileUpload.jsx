import { useState, useEffect, useRef } from 'react';
import { openDB } from 'idb';
import FileList from './FileList';
import FileInput from './FileInput';
import AudioControls from './AudioControls';
import ProgressBar from './ProgressBar';
import Timestamp from './Timestamp';

const DB_NAME = 'fileUploadsDB';
const STORE_NAME = 'files';


export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          db.createObjectStore(STORE_NAME, { keyPath: 'name' });
        },
      });
      const savedFiles = await db.getAll(STORE_NAME);
      setFiles(savedFiles);
    };
    initDB();
  }, []);

  const handleFileUpload = async (uploadedFiles) => {
    const fileDataPromises = uploadedFiles.map(async (file) => {
      const base64 = await fileToBase64(file);
      return { name: file.name, data: base64, type: file.type };
    });
    const fileData = await Promise.all(fileDataPromises);
    setFiles((prevFiles) => [...prevFiles, ...fileData]);

    const db = await openDB(DB_NAME, 1);
    fileData.forEach(async (file) => {
      await db.put(STORE_NAME, file);
    });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const playFile = (file) => {
    setCurrentFile(file.data);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = file.data;
      audioRef.current.play();
    }
  };

  const deleteFile = async (fileName) => {
    const db = await openDB(DB_NAME, 1);
    await db.delete(STORE_NAME, fileName);
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleEnded = () => {
    if (repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className='w-10/12 m-auto bg-zinc-800 p-10 rounded-lg mt-10 text-white'>
      <h1 className='text-center text-white'>Luan yurrr</h1>
      <FileInput handleFileUpload={handleFileUpload} />
      {currentFile && (
        <div className="mt-10">
          <h2 className="text-center text-lg font-bold mb-4">
          🎧 {files.find((file) => file.data === currentFile)?.name.slice(0, -4)} 🎧
          </h2>
          <audio
            ref={audioRef}
            src={currentFile}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />
          <AudioControls audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} repeat={repeat} setRepeat={setRepeat}/>
          <ProgressBar progress={progress} setProgress={setProgress} audioRef={audioRef} />
          <Timestamp currentTime={currentTime} duration={duration} />
        </div>
      )}
      <FileList files={files} playFile={playFile} deleteFile={deleteFile} />
    </div>
  );
}
