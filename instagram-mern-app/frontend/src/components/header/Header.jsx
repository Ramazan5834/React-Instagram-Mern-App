import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Avatar, Box } from "@mui/material";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import "./header.css";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ handleOpen }) => {
  const [users, setUsers] = useState("");
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUserList = async () => {
      const res = await axios.get("/users/list");
      setUsers(res.data);
    };
    getUserList();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setUserFilter(
      users.filter((user) => user.userName.includes(e.target.value))
    );
  };

  return (
    <div className="header-wrapper">
      <div className="container">
        <div className="header">
          <Logo></Logo>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: "relative" }}>
              <div className="search">
                <SearchIcon className="search-icon"></SearchIcon>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                  onClick={handleClick}
                />
                {open ? (
                  <div className="search-result-wrapper">
                    <div className="search-result">
                      {userFilter.length > 0 ? (
                        userFilter.slice(0, 3).map((user) => (
                          <Link
                            to={"/profile/" + user.userName}
                            className="search-result-link"
                            key={user._id}
                            onClick={() => setOpen(false)}
                          >
                            <Avatar
                              src={
                                user.profilePicture && PF + user.profilePicture
                              }
                              sx={{ width: 28, height: 28 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                lineHeight: "1",
                                fontSize: "12px",
                              }}
                            >
                              <b>{user.userName}</b>
                              <span>{user.fullName}</span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="search-resul-text">
                          {search.length > 0
                            ? "Aradığın kullanıcı bulunamadı."
                            : "Kullanıcı Ara"}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </Box>
          </ClickAwayListener>
          <div className="header-links">
            <Link to="/">
              <HomeOutlinedIcon className="icon"></HomeOutlinedIcon>
            </Link>
            <Link to="/messenger">
              <ChatOutlinedIcon className="icon"></ChatOutlinedIcon>
            </Link>
            <AddBoxOutlinedIcon
              className="icon"
              onClick={handleOpen}
              style={{ cursor: "pointer" }}
            ></AddBoxOutlinedIcon>

            <Link to={"/profile/" + user.userName}>
              <Avatar
                alt="Remy Sharp"
                src={user.profilePicture && PF + user.profilePicture}
                sx={{ width: 28, height: 28 }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
