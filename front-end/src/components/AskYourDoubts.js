/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./AskYourDoubts.css";
import Question from "./components/Question";
import CreateQuestion from "./components/CreateQuestion";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Chatbot from "./components/Chatbot";
import LeftBorder from "./components/LeftBorder";
import QuestionForUpdDel from "./components/QuestionForUpdDel";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';





const AskYourDoubts = (props) => {

  const [user, setUser] = useState({
    _id: "", email: "", password: "", fName: "", lName: "", branch: "", year: ""
  });

  useEffect(() => {
    getUserById();
    addQuestion();
    getQuestionsByUserId();
    getAnswersByUserId();
  });

  const traverseNotifyQuestions = () => {
    notifyMyQuestions.map((nquestionItem, index) => {
      showToastMessageForNotifications(nquestionItem.content, nquestionItem._id);
    });

    notifyMyAnswers.map((nquestionItem, index) => {
      showToastMessageForNotificationsAnswers(nquestionItem.content, nquestionItem._id);
    })
  }

  const showToastMessageForNotifications = (questionContent, questionId) => {
    toast.success(`Your question - "${questionContent}" - was approved`, {
      onClose: async () => {
        console.log("closing");
        let result = await fetch(`http://localhost:5000/update-question-approved/${questionId}`, {
          method: 'Put',
          body: JSON.stringify({ notified: true }),
          headers: {
            'Content-Type': "application/json"
          }
        });
        result = await result.json();
      },
      autoClose: 5000
    });
  };

  const showToastMessageForNotificationsAnswers = (questionContent, questionId) => {
    toast.success(`Your answer - "${questionContent}" - was approved`, {
      onClose: async () => {
        console.log("closing");
        let result = await fetch(`http://localhost:5000/update-answer-approved/${questionId}`, {
          method: 'Put',
          body: JSON.stringify({ notified: true }),
          headers: {
            'Content-Type': "application/json"
          }
        });
        result = await result.json();
      },
      autoClose: 5000
    });
  };



  const [navbarName, setNavbarName] = useState("");

  const [createQuestionUserfName, setCreateQuestionUserfName] = useState("");
  const [createQuestionUserlName, setCreateQuestionUserlName] = useState("");
  const [createQuestionUserBranch, setCreateQuestionUserBranch] = useState("");
  const [createQuestionUserYear, setCreateQuestionUserYear] = useState("");
  const [createQuestionUserEmail, setCreateQuestionUserEmail] = useState("");
  const [createQuestionUserAvatar, setCreateQuestionUserAvatar] = useState("");



  const [questions, setQuestions] = useState([]);

  const [nquestions, setnQuestions] = useState([]);

  const [myQuestions, setMyQuestions] = useState([]);
  const [myAnswers, setMyAnswers] = useState([]);

  const [notifyMyQuestions, setNotifyMyQuestions] = useState([]);
  const [notifyMyAnswers, setNotifyMyAnswers] = useState([]);

  const [isAllQuestionsButtonActive, setAllQuestionsButton] = useState(true);
  const [isMyQuestionsButtonActive, setMyQuestionsButton] = useState(false);
  const [isMyAnswersButtonActive, setMyAnswersButton] = useState(false);

  const [searchCategory, setSearchCategory] = useState("All");
  const [displaySearchCategory, setDisplaySearchCategory] = useState("Search Category");
  const [isSearchActive, setIsSearchActive] = useState(false);




  const showToastMessage = () => {
    toast.success("Question approved", {
      onClose: () => {
        console.log("closing");
      },
      autoClose: 5000
    });
  };



  const addQuestion = async () => {
    let result = await fetch(`http://localhost:5000/questions`);
    result = await result.json();
    // console.log(result);
    setnQuestions(result.filter(adminQuestion => adminQuestion.approved === true));
  }

  const getQuestionsByUserId = async () => {


    const useridForMyQuestions = props.userId;
    let resultMyQuestions = await fetch(`http://localhost:5000/questions-from-user-id/${useridForMyQuestions}`);
    resultMyQuestions = await resultMyQuestions.json();
    // console.log(result);

    setMyQuestions(resultMyQuestions.filter(adminQuestion => adminQuestion.approved === true));

    setNotifyMyQuestions(resultMyQuestions.filter(adminQuestion => adminQuestion.notified === false && adminQuestion.approved === true));
    // if(notifyMyQuestions.length > 0){
    //   showToastMessage();
    // }

  }

  const getAnswersByUserId = async () => {


    const useridForMyAnswers = props.userId;
    let resultMyAnswers = await fetch(`http://localhost:5000/answers-from-user-id/${useridForMyAnswers}`);
    resultMyAnswers = await resultMyAnswers.json();
    // console.log(result);

    setMyAnswers(resultMyAnswers.filter(adminQuestion => adminQuestion.approved === true));

    setNotifyMyAnswers(resultMyAnswers.filter(adminQuestion => adminQuestion.notified === false && adminQuestion.approved === true));

  }

  const getUserById = async () => {

    const idFetched = props.userId;

    let result = await fetch(`http://localhost:5000/user/${idFetched}`);
    result = await result.json();
    setNavbarName(`${result.fName} ${result.lName}`);

    setCreateQuestionUserfName(result.fName);
    setCreateQuestionUserlName(result.lName);
    setCreateQuestionUserBranch(result.branch);
    setCreateQuestionUserYear(result.year);
    setCreateQuestionUserEmail(result.email);
    setCreateQuestionUserAvatar(result.avatar);
    // setUser(result);
  }

  const handleAllQuestionsButton = () => {
    setAllQuestionsButton(true);
    setMyQuestionsButton(false);
    setMyAnswersButton(false);

  }

  const handleMyQuestionsButton = () => {
    setAllQuestionsButton(false);
    setMyQuestionsButton(true);
    setMyAnswersButton(false);

    // if(notifyMyQuestions.length>0){
    //   showToastMessage();
    // }


  }

  const handleMyAnswersButton = () => {
    setAllQuestionsButton(false);
    setMyQuestionsButton(false);
    setMyAnswersButton(true);

    // if(notifyMyAnswers.length>0){
    //   showToastMessage();
    // }


  }



  return (
    <div className="complete">
      <LeftBorder />

      <div className="right-area">

        <Navbar showNotifications={traverseNotifyQuestions} navbarName={navbarName} createQuestionUserAvatar={createQuestionUserAvatar} userIdSent={props.userId} userfNameSent={createQuestionUserfName} userlNameSent={createQuestionUserlName} userBranchSent={createQuestionUserBranch} userYearSent={createQuestionUserYear} />

        {/* <Search /> */}


        {/* <button onClick={traverseNotifyQuestions}>Notifications</button> */}

        <form action="">
          <div className="search-container">
            <input type="text" placeholder="Search Category" className="search-bar" name="searchCategory" value={displaySearchCategory} />

            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle id="dropdown-custom-1" className="search-category-button" style={{
                "backgroundColor": "#FF1684",
                "color": "white",
                "fontFamily": "Poppins",
                "fontStyle": "normal",
                "fontWeight": "400",
                "fontSize": "20px",
                "line-height": "30px",
                "border": "none",
                "borderRadius": "10px"
              }}>Category</Dropdown.Toggle>
              <Dropdown.Menu >
                <Dropdown.Item eventKey="1" onClick={() => { setSearchCategory("All"); setDisplaySearchCategory("Search Category"); setIsSearchActive(false); }}>All</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => { setSearchCategory("Programming"); setDisplaySearchCategory("Programming"); setIsSearchActive(true); }}>Programming</Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={() => { setSearchCategory("Placement"); setDisplaySearchCategory("Placement"); setIsSearchActive(true); }}>Placement</Dropdown.Item>
                <Dropdown.Item eventKey="4" onClick={() => { setSearchCategory("Web Dev"); setDisplaySearchCategory("Web Dev"); setIsSearchActive(true); }}>Web Dev</Dropdown.Item>
                <Dropdown.Item eventKey="5" onClick={() => { setSearchCategory("ML/AI"); setDisplaySearchCategory("ML/AI"); setIsSearchActive(true); }}>ML/AI</Dropdown.Item>
                <Dropdown.Item eventKey="6" onClick={() => { setSearchCategory("AR/VR"); setDisplaySearchCategory("AR/VR"); setIsSearchActive(true); }}>AR/VR</Dropdown.Item>
                <Dropdown.Item eventKey="7" onClick={() => { setSearchCategory("College"); setDisplaySearchCategory("College"); setIsSearchActive(true); }}>College</Dropdown.Item>
                <Dropdown.Item eventKey="8" onClick={() => { setSearchCategory("Others"); setDisplaySearchCategory("Others"); setIsSearchActive(true); }}>Others</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
        </form>





        {/* <CreateQuestion onAdd={addQuestion} /> */}
        {/* <CreateQuestion userIdSent={props.userId} userEmailSent={props.userEmailSent} userfNameSent={props.userfNameSent} userlNameSent={props.userlNameSent} userBranchSent={props.userBranchSent} userYearSent={props.userYearSent}/> */}
        <CreateQuestion userIdSent={props.userId} userEmailSent={createQuestionUserEmail} userfNameSent={createQuestionUserfName} userlNameSent={createQuestionUserlName} userBranchSent={createQuestionUserBranch} userYearSent={createQuestionUserYear} userAvatarSent={createQuestionUserAvatar} />



        <div className="main-container">
          <div className="buttons-container">
            <button className="question-section-button" onClick={handleAllQuestionsButton}>
              <p>All Questions</p>
            </button>
            <button className="question-section-button" onClick={handleMyQuestionsButton}>
              <p>Your Questions</p>
            </button>
            <button className="question-section-button" onClick={handleMyAnswersButton}>
              <p>Your Answers</p>
            </button>
          </div>

          {isAllQuestionsButtonActive ? <div><h1 style={{ "color": "#2D0660" }}>All Questions</h1></div> : null}
          {isMyQuestionsButtonActive ? <div><h1 style={{ "color": "#2D0660" }}>Your Questions</h1></div> : null}
          {isMyAnswersButtonActive ? <div><h1 style={{ "color": "#2D0660" }}>Your Answers</h1></div> : null}




          {isAllQuestionsButtonActive ? isSearchActive ? <div className="main-container">{nquestions.filter(nQuestion => nQuestion.category === searchCategory).map((nquestionItem, index) => {
            return (
              <Question
                userEmailSent={createQuestionUserEmail}
                userfNameSent={createQuestionUserfName}
                userlNameSent={createQuestionUserlName}
                userBranchSent={createQuestionUserBranch}
                userYearSent={createQuestionUserYear}
                userAvatarSent={createQuestionUserAvatar}
                key={index}
                id={index}
                userIdSent={props.userId}
                questionId={nquestionItem._id}
                fName={nquestionItem.user.fName}
                lName={nquestionItem.user.lName}
                branch={nquestionItem.user.branch}
                year={nquestionItem.user.year}
                avatar={nquestionItem.user.avatar}
                content={nquestionItem.content}
                category={nquestionItem.category}
                questionSent={nquestionItem}
              />
            );
          })}

          </div> : <div className="main-container">{nquestions.map((nquestionItem, index) => {
            return (
              <Question
                userEmailSent={createQuestionUserEmail}
                userfNameSent={createQuestionUserfName}
                userlNameSent={createQuestionUserlName}
                userBranchSent={createQuestionUserBranch}
                userYearSent={createQuestionUserYear}
                userAvatarSent={createQuestionUserAvatar}
                key={index}
                id={index}
                userIdSent={props.userId}
                questionId={nquestionItem._id}
                fName={nquestionItem.user.fName}
                lName={nquestionItem.user.lName}
                branch={nquestionItem.user.branch}
                year={nquestionItem.user.year}
                avatar={nquestionItem.user.avatar}
                content={nquestionItem.content}
                category={nquestionItem.category}
                questionSent={nquestionItem}
              />
            );
          })}

          </div> : null}




          {isMyQuestionsButtonActive ? isSearchActive ? <div className="main-container">{myQuestions.filter(myQuestion => myQuestion.category === searchCategory).map((nquestionItem, index) => {
            return (
              <Question
                key={index}
                id={index}
                questionId={nquestionItem._id}                //added
                fName={nquestionItem.user.fName}
                lName={nquestionItem.user.lName}
                branch={nquestionItem.user.branch}
                year={nquestionItem.user.year}
                avatar={nquestionItem.user.avatar}

                content={nquestionItem.content}
                category={nquestionItem.category}
              />
            );
          })}

          </div> : <div className="main-container">{myQuestions.map((nquestionItem, index) => {
            return (
              <Question
                key={index}
                id={index}
                questionId={nquestionItem._id}                //added
                fName={nquestionItem.user.fName}
                lName={nquestionItem.user.lName}
                branch={nquestionItem.user.branch}
                year={nquestionItem.user.year}
                avatar={nquestionItem.user.avatar}

                content={nquestionItem.content}
                category={nquestionItem.category}
              />
            );
          })}

          </div> : null}




          {isMyAnswersButtonActive ? <div className="main-container">{myAnswers.map((myAnswerItem, index) => {
            return (
              <QuestionForUpdDel
                key={index}
                id={index}
                answerSent={myAnswerItem}
                questionId={myAnswerItem.question._id}                //added
                fName={myAnswerItem.question.user.fName}
                lName={myAnswerItem.question.user.lName}
                branch={myAnswerItem.question.user.branch}
                year={myAnswerItem.question.user.year}
                avatar={myAnswerItem.question.user.avatar}

                content={myAnswerItem.question.content}
                category={myAnswerItem.question.category}
              />
            );
          })}

          </div> : null}




          <br />
          <br />
          <br />
          <br />
          <br />
          <br />


        </div>




      </div>

      <Chatbot />

      <ToastContainer />
    </div>
  );
}

export default AskYourDoubts;
