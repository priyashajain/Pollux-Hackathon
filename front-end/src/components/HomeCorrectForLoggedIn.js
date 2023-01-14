import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomeCorrect.css";
import Navbar from "./components/Navbar";
import NavbarForHome from "./NavbarForHome";
import Chatbot from "./components/Chatbot";


const HomeCorrectForLoggedIn = (props) => {
    

    return (
        <div>
            <div style={{ "padding": "2% 7% 1% 7%", }}>
                <Navbar navbarName={props.navbarName} createQuestionUserAvatar={props.userAvatarSent}/>
            </div>

            <div className="home-main">
                <div className="home-left-area"></div>
                <div className="home-right-area">
                    <p className="welcome-heading">Welcome to</p>
                    <p className="welcome-heading">Ask Your Seniors</p>
                    <p className="welcome-content">One place for all your queries</p>
                </div>

            </div>

            <Chatbot />
        </div>
    )
}

export default HomeCorrectForLoggedIn;