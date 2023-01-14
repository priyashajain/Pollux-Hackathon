/* eslint-disable */
import React, { useEffect, useState } from "react";

function QuestionForAdmin(props) {

    const handleAdminQuestionsDeleteButton = async () => {
        let result = await fetch(`http://localhost:5000/delete-question/${props.questionId}`, {
            method: "Delete"
        });

        result = await result.json();
    }

    const handleAdminQuestionsApproveButton = async () => {
        let result = await fetch(`http://localhost:5000/update-question-approved/${props.questionId}`, {
            method: 'Put',
            body: JSON.stringify({ approved: true }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        result = await result.json();


        let resultNoOfDoubtsAsked = await fetch(`http://localhost:5000/user-increment-noOfDoubtsAsked/${props.userIdSentFromAdmin}`, {                 //this result gets the value of res.send()
            method: 'Put',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        resultNoOfDoubtsAsked = await resultNoOfDoubtsAsked.json();
    }


    return (
        // <div className="main-container">
        <div className="question-grey-container">
            <div className="question-main-container">

                <div className="info-container">
                    <div className="student-info-container">
                        {/* <img src="../ASSETS/10.svg" alt="" />      change img to avatar by props.avatar */}
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

                <div style={{ "display": "flex", "flexDirection": "row", "marginTop": "35px" }}>
                    <div className="left-part-answer-div">
                        <div className="question">
                            <p>{props.content}</p>
                        </div>
                    </div>
                    <div className="right-part-answer-div">
                        <button className="update-delete-button" onClick={handleAdminQuestionsApproveButton}>Approve</button>
                        <button className="update-delete-button" onClick={handleAdminQuestionsDeleteButton}>Delete</button>
                    </div>
                </div>

            </div>

        </div>
        // </div>
    );
}

export default QuestionForAdmin;
