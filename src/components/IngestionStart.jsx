import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

const IngestionStart = () => {
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      console.log(reader);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const DUMMY_AVAILABLE_STUDIES = [
    "Study 1",
    "Study 2",
    "Social Coordination",
    "Study 4",
    "Study 5",
    "Study 6",
  ];

  const studyClickHandler = (e) => {
    // console.log(e.target.innerHTML);
    setSelectedStudy(e.target.innerHTML);
  };

  const handleFileInput = () => {};

  const DUMMY_AVAILABLE_STUDIES_JSX = DUMMY_AVAILABLE_STUDIES.map((study) => {
    const selected =
      selectedStudy === study ? "bg-lilacBlue" : "text-white hover:bg-cardDark";

    return (
      <div
        key={study}
        onClick={studyClickHandler}
        className={`border-2 border-white rounded h-14 flex items-center mt-2 first:mt-0 pl-4 mr-1 ${selected}`}
      >
        {study}
      </div>
    );
  });

  return (
    <div className="mt-16">
      <div className="flex justify-center gap-x-20">
        <div className="w-80">
          <h4 className="text-lg text-white">Select Study</h4>
          <div className="mt-6 h-80 overflow-y-scroll">
            {DUMMY_AVAILABLE_STUDIES_JSX}
          </div>
        </div>
        <div className="w-80 text-white">
          <h4>Upload File(s)</h4>
          <div className="mt-8 border-2">
            <div {...getRootProps()} className="h-64">
              <input {...getInputProps()} onChange={handleFileInput} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <div>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                  <button className="bg-lilacBlue w-24 h-12 rounded text-blackTextLight font-semibold">
                    Browse
                  </button>
                </div>
              )}
              <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
              </aside>
              <a href="C:\Users\richa\OneDrive\Desktop\fun\favoritegames\maggie.jpg"></a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-32 relative">
        <div className="flex gap-2">
          <div className="w-3 h-3 border-2 border-white bg-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-white rounded-full"></div>
        </div>
        <div className="text-white absolute right-60">
          <p>Continue</p>
        </div>
      </div>
    </div>
  );
};

export default IngestionStart;
