/* eslint-disable */
import React, { useState } from "react";

function AnswerForAdmin(props) {
    
    const handleAdminAnswersDeleteButton = async () => {
        let result = await fetch(`http://localhost:5000/delete-answer/${props.answerId}`, {
            method: "Delete"
        });

        result = await result.json();
    }

    const handleAdminAnswersApproveButton = async () => {
        let result = await fetch(`http://localhost:5000/update-answer-approved/${props.answerId}`, {
            method: 'Put',
            body: JSON.stringify({ approved: true }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        result = await result.json();


        let resultNoOfDoubtsAnswered = await fetch(`http://localhost:5000/user-increment-noOfDoubtsAnswered/${props.userIdSentFromAdmin}`, {                 //this result gets the value of res.send()
            method: 'Put',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        resultNoOfDoubtsAnswered = await resultNoOfDoubtsAnswered.json();
    }


    return (
        <div>

            <div className="answer-question-main-container">

                <div className="left-part-answer-div">
                    <div className="answer-info-container">
                        <div className="answer-student-info-container">
                            {/* <img src="../ASSETS/10.svg" alt="" />        change img to avatar by props.avatar */}
                            <img src={props.avatar} alt="" style={{"borderRadius":"50%", "height":"100%"}}/>
                            <div className="student-info">
                                <p className="name">{props.fName} {props.lName}</p>
                                <p className="branch-year">{props.branch}, {props.year}</p>
                            </div>
                        </div>

                    </div>

                    <div className="question">
                        <p>{props.content}</p>
                    </div>
                </div>

                <div className="right-part-answer-div">
                    <button className="update-delete-button" onClick={handleAdminAnswersApproveButton}>Approve</button>
                    <button className="update-delete-button" onClick={handleAdminAnswersDeleteButton}>Delete</button>
                </div>

            </div>

        </div>
    );
}

export default AnswerForAdmin;