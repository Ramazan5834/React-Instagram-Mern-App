import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./register.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordAgain) {
      alert("Passwords don't match!");
    } else {
      const user = {
        fullName,
        userName,
        email,
        password,
        bio,
      };

      if (profilePicture) {
        const data = new FormData();
        const fileName = Date.now() + profilePicture.name;
        data.append("name", fileName);
        data.append("file", profilePicture);
        user.profilePicture = fileName;
        try {
          await axios.post("/upload", data);
        } catch (err) {
          console.log(err);
        }
      }
      try {
        const res = await axios.post("/auth/register", user);
        if (res.status === 200) {
          toast.success("Registration succesfull!");
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="auth-page">
      <h1>Welcome to Social Media App</h1>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-input">
          <TextField
            required
            type="text"
            label="Full Name"
            variant="outlined"
            onChange={(e) => setFullName(e.target.value)}
          ></TextField>
        </div>
        <div className="form-input">
          <TextField
            required
            type="text"
            label="Username"
            variant="outlined"
            onChange={(e) => setUserName(e.target.value)}
          ></TextField>
        </div>
        <div className="form-input">
          <TextField
            required
            type="email"
            label="E-mail"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </div>
        <div className="form-input">
          <TextField
            required
            type="password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
        </div>
        <div className="form-input">
          <TextField
            required
            type="password"
            label="Password Confirm"
            variant="outlined"
            onChange={(e) => setPasswordAgain(e.target.value)}
          ></TextField>
        </div>
        <div className="form-input">
          <TextField
            required
            type="file"
            variant="outlined"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          ></TextField>
        </div>
        <div className="form-input">
          <TextField
            required
            type="text"
            label="Biography"
            variant="outlined"
            onChange={(e) => setBio(e.target.value)}
          ></TextField>
        </div>
        <Link to="/login" className="auth-link">
          Back To Login
        </Link>
        <Button type="submit" variant="contained" color="success">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
