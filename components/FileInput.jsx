import { FaFileAudio } from "react-icons/fa";

export default function FileInput({ handleFileUpload }) {
  const onFileChange = (e) => handleFileUpload(Array.from(e.target.files));

  return (
    <div className="file-input-container">
      <label htmlFor="file-upload" className="file-label">
        <input
          type="file"
          id="file-upload"
          accept="audio/*"
          multiple
          onChange={onFileChange}
          className="file-input"
        />
        <FaFileAudio className="file-icon" size={50} />
      </label>
    </div>
  );
}
