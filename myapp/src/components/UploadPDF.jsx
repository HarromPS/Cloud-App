import React, {  useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchFiles } from '../index.js';

const UploadImg = () => {
    const [pdfFiles, setpdfFiles] = useState(null);
    const [message, setMessage] = useState("File Selected");
    const [uploadMessage, setuploadMessage] = useState("Upload")

    // using context api
    const fetchFiles = useFetchFiles().fetchPdfs;

    // Handle function to upload file
    const handleFileChange = (e) => {
        setpdfFiles(e.target.files[0]);
    };

    const handleUploadImage = async (e) => {
        // Prevent reload
        e.preventDefault();
        setuploadMessage("Uploading");

        // Check if file is selected 
        if (!pdfFiles) {
            setuploadMessage("Upload");
            toast.warning('Please Select a file to Upload', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        
        const formData = new FormData();
        formData.append("file", pdfFiles);
        formData.append("cloud_name", "ddboggykm");
        
        // Optional: Log formData entries for debugging
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }

        try {
            const res = await fetch("http://localhost:4001/media/createRequestForPDfs", {
                method: "POST",
                body: formData,
                'Content-Type': 'multipart/form-data',
            });
            
            const json = await res.json();
            console.log(json);
            
            setuploadMessage("Upload");
            toast.success(`${pdfFiles.name} Uploaded`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            console.error('Upload error:', err);
        }
    };


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className='mx-auto w-full p-2 text-center border-4 border-[#0ED3CF] h-[340px] rounded-xl'>
                <h3 className='text-center text-[#00928f] font-bold text-xl'>Upload PDFs</h3>
                <div className='border-dashed rounded-xl border-2 border-[#00928f] text-center mx-auto w-[80%] h-[80%] mt-2 mb-2'>
                    <form method='post'>
                        <FontAwesomeIcon icon={faUpload} className='m-4 text-4xl' />
                        <p className='decoration-1 text-[#00928f]'>(Upload PDF)</p>

                        <input type="file" accept='.pdf' onChange={handleFileChange} className="w-full m-2 overflow-hidden text-sm text-center" />

                        {pdfFiles && <p>{message}</p>}
                        <button type='submit' onClick={handleUploadImage} className='text-xl hover:bg-green-600 font-bold bg-[#00928f] text-white m-3 p-1 rounded-xl'>{uploadMessage}</button>
                    </form>
                </div>
            </div>

            <div id="preview" className="border-2 bg-[#ededed] w-full mt-2 rounded-xl">
                <h1 className='p-1 m-2 text-xl font-bold'>Preview</h1>
                {fetchFiles && <div className='flex flex-wrap items-center justify-between'>
                    {
                        fetchFiles["pdfs"].map((item, index) => {
                            return (
                                <div key={item.asset_id} className='border-2 rounded-xl p-2 m-2 border-[#0ED3CF] font-bold '>
                                    <p className='p-1 m-1'>Format: {item.format}</p>
                                    <p className='p-1 m-1'>Version: {item.version}</p>
                                    <p className='p-1 m-1'>Created At: {item.created_at}</p>
                                    <div className='text-center'>
                                        <a href={item.secure_url} target='_blank' className='p-2 m-2 text-white bg-green-600'>View</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                }
        </div >
        </>
    );
};

export default UploadImg;