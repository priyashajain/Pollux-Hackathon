/* eslint-disable */
import React from "react";

function Answer(props) {
    return (
        <div className="question-main-container">

            <div className="info-container">
                <div className="student-info-container">
                    {/* <img src="../ASSETS/10.svg" alt="" />          change img to avatar using props.avatar */}
                    <img src={props.avatar} alt="" style={{"borderRadius":"50%", "height":"100%"}}/>
                    <div className="student-info">
                        <p className="name">{props.fName} {props.lName}</p>
                        <p className="branch-year">{props.branch}, {props.year}</p>
                    </div>
                </div>
                <div className="category-like-container">
                    <div className="category">
                        <p>{props.category}</p>
                    </div>
                    <img src="../ASSETS/Favorite.svg" alt="" />
                </div>
            </div>

            <div className="question">
                <p>{props.content}</p>
                <p style={{ "color": "#FF1684", "fontSize": "12px" }}>{props.edited}</p>
            </div>

        </div>
    );
}

export default Answer;