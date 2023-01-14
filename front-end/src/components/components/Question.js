/* eslint-disable */
import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Question(props) {
  const [isViewAnswersButtonActive, setIsViewAnswersButton] = useState(false);


  const showToastMessage = () => {
    toast.success("Your answer has been sent to the admin for approval.", {
      onClose: () => {
        console.log("closing");
      },
      autoClose: 2500
    });
  };

  const showToastMessageForSrJr = () => {
    toast.warning("You cannot answer this question as we only permit seniors to answer the doubts of juniors!", {
      onClose: () => {
        console.log("closing");
      },
      autoClose: 2500
    });
  };



  function handleViewAnswersButtonClick(event) {
    // alert("Answer button clicked!");
    setIsViewAnswersButton(!isViewAnswersButtonActive);
    // console.log(isViewAnswersButtonActive);
    getAnswerByQuestionId();
    event.preventDefault();
  }

  const [isAnsweringActive, setIsAnsweringActive] = useState(false);

  const [acategory, setACategory] = useState("");
  const [acontent, setAContent] = useState("");
  const [approved, setApproved] = useState(false);
  const [notified, setNotified] = useState(false);

  // const [userId, setUserId] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [userPassword, setUserPassword] = useState("");
  // const [userfName, setUserfName] = useState("");
  // const [userlName, setUserlName] = useState("");
  // const [userBranch, setUserBranch] = useState("");
  // const [userYear, setUserYear] = useState("");

  // const [question_id, setQuestion_id] = useState("");
  // const [questionCategory, setQuestionCategory] = useState("");
  // const [questionContent, setQuestionContent] = useState("");
  // // const [questionUser, setQuestionUser] = useState("")
  // const [questionUserId, setQuestionUserId] = useState("");
  // const [questionUserEmail, setQuestionUserEmail] = useState("");
  // const [questionUserPassword, setQuestionUserPassword] = useState("");
  // const [questionUserfName, setQuestionUserfName] = useState("");
  // const [questionUserlName, setQuestionUserlName] = useState("");
  // const [questionUserBranch, setQuestionUserBranch] = useState("");
  // const [questionUserYear, setQuestionUserYear] = useState("");



  const [answers, setAnswers] = useState([]);

  const getAnswerByQuestionId = async () => {

    const id = props.questionId;
    console.log(id);
    let result = await fetch(`http://localhost:5000/answers/${id}`);
    result = await result.json();

    setAnswers(result.filter(adminQuestion => adminQuestion.approved === true));

  }



  // const getQuestionById = async () => {
  //   const quesid = props.questionId;
  //   // let result = await fetch(`http://localhost:5000/user/${auth._id}`);
  //   let resQuestion = await fetch(`https://ask-your-seniors-backend.vercel.app/question/${quesid}`);
  //   resQuestion = await resQuestion.json();
  //   // console.log(resUser);

  //   // setQuestion(resQuestion);

  //   // setQuestion_id(resQuestion._id);
  //   // setQuestionContent(resQuestion.content);
  //   // setQuestionCategory(resQuestion.category);
  //   // setQuestionUserId(resQuestion.user._id);
  //   // setQuestionUserEmail(resQuestion.user.email);
  //   // // setQuestionUserPassword(resQuestion.user.password);
  //   // setQuestionUserfName(resQuestion.user.fName);
  //   // setQuestionUserlName(resQuestion.user.lName);
  //   // setQuestionUserBranch(resQuestion.user.branch);
  //   // setQuestionUserYear(resQuestion.user.year);
  // }




  // const getUserById = async () => {
  //   const id = props.userIdSent;

  //   let resUser = await fetch(`https://ask-your-seniors-backend.vercel.app/user/${id}`);
  //   resUser = await resUser.json();
  //   // console.log(resUser);

  //   // setUser(resUser);

  //   // setUserId(resUser._id);
  //   // setUserEmail(resUser.email);
  //   // // setUserPassword(resUser.password);
  //   // setUserfName(resUser.fName);
  //   // setUserlName(resUser.lName);
  //   // setUserBranch(resUser.branch);
  //   // setUserYear(resUser.year);

  //   setApproved(false);
  //   setNotified(false);
  // }




  function handleAnswersButtonClick(event) {
    if (Number(props.userYearSent) <= Number(props.questionSent.user.year)) {
      setIsAnsweringActive(!isAnsweringActive);
      // alert("Answer button clicked");
      setApproved(false);
      setNotified(false);
      // getUserById();                           //working here as this function not async
      // getQuestionById();
      event.preventDefault();

    }       //ORIGINAL

    else {                                                           //ORIGINAL
      // alert("You cannot answer this question!");
      showToastMessageForSrJr();
      // setIsAnsweringActive(!isAnsweringActive);
      event.preventDefault();

    }

  }



  const handleAnswersButtonClickAndSubmitAnswer = async (event) => {


    if (Number(props.userYearSent) <= Number(props.questionSent.user.year)) {   //ORIGINAL

      // const user = {                //ORIGINAL
      //   _id: userId,
      //   email: userEmail,
      //   // password: userPassword,
      //   fName: userfName,
      //   lName: userlName,
      //   branch: userBranch,
      //   year: userYear
      // }


      const user = {
        _id: props.userIdSent
        // email: props.userEmailSent,
        // // password: userPassword,
        // fName: props.userfNameSent,
        // lName: props.userlNameSent,
        // branch: props.userBranchSent,
        // year: props.userYearSent,
        // avatar: props.userAvatarSent
      }




      console.log("User object I created", user);



      // const question = {
      //   _id: question_id,
      //   content: questionContent,
      //   category: questionCategory,
      //   user: {
      //     _id: questionUserId,
      //     email: questionUserEmail,
      //     // password: questionUserPassword,
      //     fName: questionUserfName,
      //     lName: questionUserlName,
      //     branch: questionUserBranch,
      //     year: questionUserYear
      //   }
      // }




      const question = {
        _id: props.questionId
        // content: props.questionSent.content,
        // category: props.questionSent.category,
        // user: {
        //   _id: props.questionSent.user._id,
        //   email: props.questionSent.user.email,
        //   // password: questionUserPassword,
        //   fName: props.questionSent.user.fName,
        //   lName: props.questionSent.user.lName,
        //   branch: props.questionSent.user.branch,
        //   year: props.questionSent.user.year,
        //   avatar: props.questionSent.user.avatar
        // }
      }


      console.log("Question object I created", question);


      let resultAnswer = await fetch("http://localhost:5000/createanswer", {
        method: "post",
        body: JSON.stringify({ content: acontent, user, question, approved, notified }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      resultAnswer = await resultAnswer.json();

      if (resultAnswer.user.fName && resultAnswer.question.content && resultAnswer.question.user.fName) {
        // alert("Question submitted");
        setIsAnsweringActive(!isAnsweringActive);
        showToastMessage();
      }



      // let resultNoOfDoubtsAnswered = await fetch(`https://ask-your-seniors-backend.vercel.app/user-increment-noOfDoubtsAnswered/${userId}`, {                 //this result gets the value of res.send()
      //   method: 'Put',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });

      // resultNoOfDoubtsAnswered = await resultNoOfDoubtsAnswered.json();

      event.preventDefault();

    }       //ORIGINAL

    else {                                                           //ORIGINAL
      // alert("You cannot answer this question!");
      showToastMessageForSrJr();
      setIsAnsweringActive(!isAnsweringActive);
    }

  }




  return (
    <div className="question-grey-container">
      <div className="question-main-container">

        <div className="info-container">
          <div className="student-info-container">
            {/* <img src="../ASSETS/10.svg" alt="" />       change img to avatar here using props.avatar */}
            <img src={props.avatar} alt="" style={{ "borderRadius": "50%", "height": "100%" }} />
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

        <a href="" onClick={handleAnswersButtonClick} style={{ "textDecoration": "none" }}>
          <div className="answer-container">
            <img src="../ASSETS/Message.svg" alt="" />
            <p>Answer</p>
          </div>
        </a>

        <a href="" onClick={handleViewAnswersButtonClick} style={{ "textDecoration": "none" }}>
          <div className="answer-container">
            <img src="../ASSETS/Message.svg" alt="" />
            <p>View Answers</p>
          </div>
        </a>

        {/* <p>{props.questionId}</p> */}


      </div>

      <br />




      {isAnsweringActive ?
        <div className="update-answer-container">
          <textarea
            className="update-answer-input-box"
            type="text"
            placeholder="Enter answer"
            rows="3"
            name="content"
            value={acontent}
            onChange={(event) => { setAContent(event.target.value) }}
          />
          <button className="update-answer-submit-button" onClick={handleAnswersButtonClickAndSubmitAnswer}>Submit</button>
        </div>

        : null
      }



      {isViewAnswersButtonActive ? <div>{answers.map((answerItem, index) => {
        return (
          <Answer
            key={index}
            id={index}
            fName={answerItem.user.fName}
            lName={answerItem.user.lName}
            branch={answerItem.user.branch}
            year={answerItem.user.year}
            avatar={answerItem.user.avatar}
            content={answerItem.content}
            category="Answer"
            edited={answerItem.edited}
          />
        );
      })} </div> : null}


      <ToastContainer />
    </div>
  );
}

export default Question;
