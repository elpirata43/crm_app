import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { fetchUserAccounts } from "../../store/accounts";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(fetchUserAccounts())
    // closeMenu();
    navigate("/");
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        border: "solid",
        background: "black",
      }}
    >
      <Link to={"/"}>
      <button>DashBoard</button>
      </Link>
      <Link to="/Login">
        <button>Login</button>
      </Link>
      <Link to={"/CreateAccount"}><button>Create Account</button></Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
}