import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";


function UploadUi() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]); // Selects the first file only
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!file) return alert("Please select a file first!");
  
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:8000/api/v1/resume/upload-file-resume", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response)
  
      const data = await response.json();
      console.log("Upload Response:", data); // ✅ Debugging Log
  
      if (data.statusCode === 200) {  // Check if response is OK
        setUploadedUrl(data.data.path); // Update with correct file path
        alert("File uploaded successfully!");
      } else {
        alert("File not uploaded, try again later.");
      }
  
    } catch (error) {
      throw new Error(error);
    } finally {
      setUploading(false);
    }
  };
  



  return (
    <div className="flex flex-col items-center justify-center w-[600px] mt-28 mx-auto h-64 border-2 border-dashed hover:border-gray-200 border-gray-400 rounded-lg p-5 bg-gray-900 text-white cursor-pointer">
      <div {...getRootProps()} className="w-full h-full flex items-center justify-center">
        <input {...getInputProps()} />
        {!file && <p className="text-gray-500">Drag & Drop your files here, or click to select files</p>}
      </div>

      {file && (
        <div className="mt-3 text-center">
          <h3 className="mb-2">Uploaded File:</h3>
          <p>{file.name}</p>
          <button onClick={handleUpload} className="mt-3 px-4 py-2 bg-blue-500 rounded">
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      )}

      {uploadedUrl && (
        <p className="mt-4 text-green-400">
          File uploaded successfully! <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">View File</a>
        </p>
      )}
    </div>
  );
}

export default UploadUi;
