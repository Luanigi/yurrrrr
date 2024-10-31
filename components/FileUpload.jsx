import { useState, useEffect, useRef } from 'react';
import { openDB } from 'idb';
import { FaFileAudio, FaTrashAlt  } from "react-icons/fa";
import { MdOutlineRepeatOn, MdOutlineRepeatOneOn } from "react-icons/md";
import { IoPlayCircleSharp } from "react-icons/io5";

const DB_NAME = 'fileUploadsDB';
const STORE_NAME = 'files';

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [repeat, setRepeat] = useState(false);
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

  const handleFileUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);

    const fileDataPromises = uploadedFiles.map(async (file) => {
      const base64 = await fileToBase64(file);
      return {
        name: file.name,
        data: base64,
        type: file.type,
      };
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
  };

  const deleteFile = async (fileName) => {
    const db = await openDB(DB_NAME, 1);
    await db.delete(STORE_NAME, fileName);

    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
  };

  const toggleRepeat = () => {
    setRepeat((prevRepeat) => !prevRepeat);
  };

  // Event handler for when the audio file ends
  const handleAudioEnded = () => {
    if (repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className='w-10/12 m-auto bg-zinc-800 grid justify-center p-10 rounded-lg mt-10'>
      <h1 className='text-center text-white'>Luan Yurrrr</h1>



      <div className="file-input-container">
      <label htmlFor="file-upload" className="file-label">
        <input
          type="file"
          id="file-upload"
          accept="audio/mpeg, audio/mp3, audio/wav"
          multiple
          onChange={handleFileUpload}
          className="file-input"
        />
          <FaFileAudio className="file-icon" size={50} />
      </label>
    </div>

    {currentFile && (
        <div className='mt-10'>
          <audio
            ref={audioRef}
            controls
            src={currentFile}
            onEnded={handleAudioEnded}
          />
          <button onClick={toggleRepeat} className='m-auto grid'>
            {repeat ? <MdOutlineRepeatOneOn /> : <MdOutlineRepeatOn />}
          </button>
        </div>
      )}

      <ul className='bg-zinc-700 rounded grid gap-5 md:grid-cols-2 grid-cols-1 mt-10 p-5'>
        {files.map((file, index) => (
          <li key={index} className='m-auto bg-zinc-600 rounded-lg border-white border-2 p-2'>
            <span className='text-xl text-white '>{file.name.slice(0, -4)}</span>
            <br />
            <button onClick={() => playFile(file)}><IoPlayCircleSharp /></button>
            <button onClick={() => deleteFile(file.name)}><FaTrashAlt /></button>
          </li>
        ))}
      </ul>

      
    </div>
  );
}
