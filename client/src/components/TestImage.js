import React, { useState } from "react";

import axios from "axios";

function TestImage() {
  const [user, setUser] = useState({});

  const [selectedFile, setSelectedFile] = useState(null);
  // const [inputs, setInputs] = useState([]);

  const handleChange = ({ target }) => {
    setUser((state) => ({ ...state, [target.name]: target.value }));
  };
  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };
  // On file upload (click the upload button)
  const onSubmitForm = async (e) => {
    e.preventDefault();
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object - file
    formData.append("imagefile", selectedFile, selectedFile.name);
    //  Update the formData object - other inputs from state
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });
    try {
      // Request made to the backend api
      // Send formData object
      // Note: fetch syntax: fetch("/images", { method: "POST" });
      await axios.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Select file to upload:</h3>
      <input
        value={user.firstname}
        onChange={handleChange}
        name="firstname"
        type="text"
        className="form-control mb-2"
        placeholder="firstname"
      />
      <input
        value={user.lastname}
        onChange={handleChange}
        name="lastname"
        type="text"
        className="form-control mb-2"
        placeholder="lastname"
      />
      <input
        value={user.password}
        onChange={handleChange}
        name="password"
        type="text"
        className="form-control mb-2"
        placeholder="password"
      />
      <input type="file" onChange={onFileChange} />

      <button onClick={onSubmitForm}>Upload</button>
    </div>
  );
}

export default TestImage;
