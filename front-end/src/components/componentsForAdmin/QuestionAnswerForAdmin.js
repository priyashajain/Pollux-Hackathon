/* eslint-disable */
import React, { useEffect, useState } from "react";
import AnswerForAdmin from "./AnswerForAdmin";




function QuestionAnswerForAdmin(props) {

  return (
    <div className="question-grey-container">
      <div className="question-main-container">

        <div className="info-container">
          <div className="student-info-container">
            {/* <img src="../ASSETS/10.svg" alt="" />           change img to avatar by props.avatar */}
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
        </div>



      </div>


      <AnswerForAdmin
        answerId={props.answerSent._id}
        fName={props.answerSent.user.fName}
        lName={props.answerSent.user.lName}
        branch={props.answerSent.user.branch}
        year={props.answerSent.user.year}
        avatar={props.answerSent.user.avatar}

        content={props.answerSent.content}
        category="Answer"
        userIdSentFromAdmin={props.answerSent.user._id}
      />

      


    </div>
  );
}

export default QuestionAnswerForAdmin;
