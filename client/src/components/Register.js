import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    location: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  // const registerUser = () => {
  //   fetch("/users/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.message);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const registerUser = async (req, res) => {
    try {
      let result = await axios.post("/users/register", user);
      //history push: home page / register / login
      //history replace: home page / login
      //push from actual url ("/register") to url("/login")
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
        <button className=" btn btn-primary" onClick={registerUser}>
          Sign up
        </button>
      </div>
    </div>
  );
}
