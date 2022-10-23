import React, { useState, useContext } from "react";
import Header from "./components/header/Header";
import Share from "./components/share/Share";
import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Share open={open} handleClose={handleClose}></Share>
      <ToastContainer></ToastContainer>
      <Router>
        {user && <Header handleOpen={handleOpen}></Header>}
        <Routes>
          <Route
            path="/"
            element={user ? <Home></Home> : <Login></Login>}
          ></Route>
          <Route
            path="/profile/:username"
            element={user ? <Profile></Profile> : <Login></Login>}
          ></Route>
          <Route
            path="/messenger"
            element={user ? <Messenger></Messenger> : <Login></Login>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
