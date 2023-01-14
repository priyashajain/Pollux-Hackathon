import React, { useState, useEffect } from "react";
import QuestionAnswerForAdmin from "./componentsForAdmin/QuestionAnswerForAdmin";
import QuestionForAdmin from "./componentsForAdmin/QuestionForAdmin";
import NavbarForAdmin from "./NavbarForAdmin";

const Admin = () => {
    const [isAdminQuestionsButtonActive, setAdminQuestionsButton] = useState(true);
    const [isAdminAnswersButtonActive, setAdminAnswersButton] = useState(false);

    const [adminQuestions, setAdminQuestions] = useState([]);
    const [adminAnswers, setAdminAnswers] = useState([]);

    useEffect(() => {
        getAdminQuestions();
        getAdminAnswers();
    });

    const getAdminQuestions = async () => {
        let resultAdminQuestions = await fetch(`http://localhost:5000/questions`);
        resultAdminQuestions = await resultAdminQuestions.json();
        // console.log(result);
        setAdminQuestions(resultAdminQuestions.filter(adminQuestion => adminQuestion.approved === false));
    }

    const getAdminAnswers = async () => {
        let resultAdminAnswers = await fetch(`http://localhost:5000/all-answers`);
        resultAdminAnswers = await resultAdminAnswers.json();
        // console.log(result);
        setAdminAnswers(resultAdminAnswers.filter(adminAnswer => adminAnswer.approved === false));
    }


    const handleAdminQuestionsButton = () => {
        setAdminQuestionsButton(true);
        setAdminAnswersButton(false);
    }

    const handleAdminAnswersButton = () => {
        setAdminAnswersButton(true);
        setAdminQuestionsButton(false);
    }

    return (
        <div>

            <div style={{"paddingLeft":"10%", "marginBottom":"20px", "marginTop":"25px"}}>
                <NavbarForAdmin />
            </div>
            <h1 className="leaderboard-main-heading" style={{"marginBottom":"20px"}}>Admin Page</h1>

            <div className="main-container">
                <div className="buttons-container">
                    <button className="question-section-button" onClick={handleAdminQuestionsButton}>
                        <p>Questions</p>
                    </button>
                    <button className="question-section-button" onClick={handleAdminAnswersButton}>
                        <p>Answers</p>
                    </button>
                </div>
            </div>

            {isAdminQuestionsButtonActive ? <div className="main-container">{adminQuestions.map((adminQuestionItem, index) => {
                return (
                    <QuestionForAdmin
                        key={index}
                        id={index}
                        questionId={adminQuestionItem._id}
                        fName={adminQuestionItem.user.fName}
                        lName={adminQuestionItem.user.lName}
                        branch={adminQuestionItem.user.branch}
                        year={adminQuestionItem.user.year}
                        avatar={adminQuestionItem.user.avatar}
                        content={adminQuestionItem.content}
                        category={adminQuestionItem.category}
                        userIdSentFromAdmin={adminQuestionItem.user._id}
                    />
                );
            })}</div> : null}




            {isAdminAnswersButtonActive ? <div className="main-container">{adminAnswers.map((adminAnswerItem, index) => {
                return (

                    <QuestionAnswerForAdmin
                        key={index}
                        id={index}
                        answerSent={adminAnswerItem}
                        questionId={adminAnswerItem.question._id}
                        fName={adminAnswerItem.question.user.fName}
                        lName={adminAnswerItem.question.user.lName}
                        branch={adminAnswerItem.question.user.branch}
                        year={adminAnswerItem.question.user.year}
                        avatar={adminAnswerItem.question.user.avatar}
                        content={adminAnswerItem.question.content}
                        category={adminAnswerItem.question.category}
                    />

                );
            })}</div> : null}


        </div>
    )
}

export default Admin;