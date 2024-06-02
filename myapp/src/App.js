import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import UploadImg from './components/UploadImg';
import UploadPDF from './components/UploadPDF';
import UploadVid from './components/UploadVid';

const App = () => {
  return (
    <>
      <div className='flex items-center text-2xl text-center justify-items-start '>
        {/* cludinary upload logo */}
        <img src="https://download.logo.wine/logo/Cloudinary/Cloudinary-Logo.wine.png" alt="cloudinary logo" className='w-[10%]' />

        {/* upload your Images | Videos | PDFs */}
        <span className='p-2 m-1'>Simple Tutorial To Upload Your</span><Link to="/"><span className='p-2 m-2 font-bold text-blue-700'>Images</span></Link>|<Link to="/uploadVideos"><span className='p-2 m-2 font-bold text-blue-700'>Videos</span></Link>|<Link to="/uploadPdfs"><span className='p-2 m-2 font-bold text-blue-700'>PDFs</span></Link>
      </div>
      <div className='w-[80%] mx-auto'>

        <Routes>
          <Route path="/" element={<UploadImg />} />
          <Route path="/uploadVideos" element={<UploadVid />} />
          <Route path="/uploadPdfs" element={<UploadPDF />} />
        </Routes>
      </div>
    </>
  );
};

export default App
