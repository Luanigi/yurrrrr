"use client";

import FileUpload from '../components/FileUpload';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

  useEffect(() => {
    AOS.init({
         duration: 800,
         once: false,
       })
 }, [])

  return (
    <div className="App">
      <FileUpload />
    </div>
  );
}

export default App;
