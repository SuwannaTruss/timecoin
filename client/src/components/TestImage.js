import React, { useState } from "react";

import axios from "axios";

function TestImage() {
  const [selectedFile, setSelectedFile] = useState([]);

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("imagefile", selectedFile, selectedFile.name);

    try {
      // Request made to the backend api
      // Send formData object
      const res = await axios.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h3>Select file to upload:</h3>
      <input type="file" onChange={onFileChange} />

      <button onClick={onFileUpload}>Upload</button>
      <input type="text" placeholder="category name" />
    </div>
  );
}

export default TestImage;
