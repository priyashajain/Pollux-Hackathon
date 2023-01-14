/* eslint-disable */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function NavbarForHome(props) {
  
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");      
  }


  const googleAuth = () => {
    window.open(
      `http://localhost:5000/auth/google/callback`,
      "_self"
    );
  };


  return (
    <div className="nav-container-for-home">
      <div className="cb-logo-container">
        <img src="../ASSETS/Frame 21.svg" className="cb-logo-container-img" alt="" />
      </div>

      <div className="nav-items-container">
        <ul>
          

          <li><Link to="/ask-your-doubts" className="navbar-link-style">Ask Your Doubts</Link></li>
          <li><Link to="/leaderboard" className="navbar-link-style">Leaderboard</Link></li>
          <li><Link to="/" className="navbar-link-style">Home</Link></li>
          {/* <li><Link to="/" className="navbar-link-style">Quiz</Link></li> */}
        </ul>
      </div>

     

      <div className="profile-container-for-home">

        <button className="signin-signup-button" onClick={googleAuth}>Sign Up</button>
        <button className="signin-signup-button" onClick={googleAuth}>Sign In</button>

        {/* <button className="signin-signup-button">Sign In</button> */}
      </div>


    </div>
  );
}

export default NavbarForHome;