import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function UploadUi() {
  const [files, setFiles] = useState(null);

  useEffect(()=>{
    console.log('new file uploaded', files)
  },[files])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(() => acceptedFiles[0]); // Appends new files
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });
  console.log(files);

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center w-[600px] mt-28 mx-auto h-64 border-2 border-dashed border-gray-400 rounded-lg p-5 bg-gray-900 text-white cursor-pointer"
    >
      <input {...getInputProps()} />
      {!files && <p>Drag & Drop your files here, or click to select files</p>}

      {/* Show the uploaded file names */}
      {files && (
        <div className="mt-3">
          <h3 className="text-center mb-4">Uploaded File:</h3>
          <p>{files.name}</p>
        </div>
      )}
    </div>
  );
}

export default UploadUi;
