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
      <div>
        <div>
          <h1 classname="text-secondary">Register</h1>
        </div>
        <div className="login-form-1">
          <div id="login-form" className="text-left">
            <div className="login-form-main-message"></div>
            <div className="main-login-form">
              <div className="login-group">
                <div className="form-group">
                  <label htmlFor="lg_username" className="sr-only">
                    Username
                  </label>
                  <input
                    value={user.username}
                    onChange={handleChange}
                    name="username"
                    type="text"
                    className="form-control"
                    id="lg_username"
                    placeholder="username "
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lg_password" className="sr-only">
                    Password
                  </label>
                  <input
                    className="form-control"
                    id="lg_password"
                    placeholder="password"
                    value={user.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lg_email" className="sr-only">
                    Email
                  </label>
                  <input
                    value={user.email}
                    onChange={handleChange}
                    name="email"
                    type="text"
                    className="form-control mb-2"
                    placeholder="email"
                    id="lg_email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lg_firstname" className="sr-only">
                    First Name
                  </label>
                  <input
                    value={user.firstname}
                    onChange={handleChange}
                    name="firstname"
                    type="text"
                    className="form-control"
                    placeholder="firstname"
                    id="lg_firstname"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lg_lastname" className="sr-only">
                    Last Name
                  </label>
                  <input
                    value={user.lastname}
                    onChange={handleChange}
                    name="lastname"
                    type="text"
                    className="form-control"
                    placeholder="lastname"
                    id="lg_lastname"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lg_location" className="sr-only">
                    Location
                  </label>
                  <input
                    value={user.location}
                    onChange={handleChange}
                    name="location"
                    type="text"
                    className="form-control "
                    placeholder="location"
                    id="lg_location"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lg_file" className="sr-only">
                    Location
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={onFileChange}
                    id="lg_file"
                  />
                </div>
              </div>
              <button className="login-button" onClick={registerUser}>
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
            <div className="etc-login-form">
              {/* <p>
                forgot your password? <a href="#">click here</a>
              </p> */}
              {/* <p>
                new user? <NavLink to="/register">create a new account</NavLink>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
