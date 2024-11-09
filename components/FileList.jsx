import { FaPlay, FaTrashAlt } from "react-icons/fa";

export default function FileList({ files, playFile, deleteFile }) {
  return (
    <ul className='bg-zinc-700 rounded grid gap-5 md:grid-cols-2 grid-cols-1 mt-10 p-5'>
        {files.map((file, index) => (
          <li key={index} className='m-auto bg-zinc-600 rounded-lg border-white border-2 p-2 w-full'>
            <span className='text-lg text-white '>{file.name.slice(0, -4)}</span>
            <br />
            <button onClick={() => playFile(file)}><FaPlay /></button>
            <button onClick={() => deleteFile(file.name)}><FaTrashAlt /></button>
          </li>
        ))}
      </ul>
  );
}
