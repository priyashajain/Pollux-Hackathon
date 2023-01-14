/* eslint-disable */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function NavbarForAdmin(props) {

    const navigate = useNavigate();

    const logout = () => {
        window.open(`http://localhost:5000/auth/logout`, "_self");
    };

    return (
        <div className="nav-container">
            <div className="cb-logo-container">
                <img src="../ASSETS/Frame 21.svg" className="cb-logo-container-img" alt="" />
            </div>


            <div className="profile-container">
                <div className="student-name-and-arrow-container">
                    <Link to="/signup" className="signin-signup-button" onClick={logout}>Logout</Link>
                </div>
                {/* <img src="../ASSETS/10.svg" alt="" /> */}
            </div>


        </div>
    );
}

export default NavbarForAdmin;