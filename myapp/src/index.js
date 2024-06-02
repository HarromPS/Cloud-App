import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const FetchFilesContext = createContext();

export const FetchFilesProvider = ({ children }) => {
  const [data, setData] = useState({
    fetchImages:null,
    fetchVideos: null,
    fetchPdfs: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imagesRes, videosRes, pdfsRes] = await Promise.all([
          fetch("http://localhost:4001/media/getAllImages"),
          fetch("http://localhost:4001/media/getAllVideos"),
          fetch("http://localhost:4001/media/getAllPdfs"),
        ]);
        const images = await imagesRes.json();
        const videos = await videosRes.json();
        const pdfs = await pdfsRes.json();
        setData({ fetchImages: images, fetchVideos: videos, fetchPdfs: pdfs });

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <FetchFilesContext.Provider value={data}>
      {children}
    </FetchFilesContext.Provider>
  );
};
export const useFetchFiles = () => useContext(FetchFilesContext);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FetchFilesProvider>
        <App />
      </FetchFilesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


