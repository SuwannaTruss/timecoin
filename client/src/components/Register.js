import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const history = useHistory();

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  const registerUser = async (req, res) => {
    const formData = new FormData();
    formData.append("imagefile", selectedFile, selectedFile.name);
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    try {
      let result = await axios.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result) history.push("/login");
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <input
          value={user.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
          placeholder="username"
        />
        <input
          value={user.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
          placeholder="password"
        />
        <input
          value={user.email}
          onChange={handleChange}
          name="email"
          type="text"
          className="form-control mb-2"
          placeholder="email"
        />
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
          value={user.location}
          onChange={handleChange}
          name="location"
          type="text"
          className="form-control mb-2"
          placeholder="location"
        />
        <input
          type="file"
          className="form-control mb-2"
          onChange={onFileChange}
        />
        <button className=" btn btn-primary" onClick={registerUser}>
          Sign up
        </button>
      </div>
    </div>
  );
}
