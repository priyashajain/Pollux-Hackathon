import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ReactPaginate from 'react-paginate';
import "./Leaderboard.css";

const Leaderboard = (props) => {
    let [users, setUsers] = useState([]);
    // let [sortedUsers, setSortedUsers] = useState([]);
    const [navbarName, setNavbarName] = useState("");
    const [navbarAvatar, setNavbarAvatar] = useState("");

    const [winner, setWinner] = useState({
        branch: "",
        email: "",
        fName: "",
        lName: "",
        noOfDoubtsAnswered: 0,
        noOfDoubtsAsked: 0,
        password: "",
        year: "",
        _id: ""
    });

    const [winnerfName, setWinnerfName] = useState("");
    const [winnerlName, setWinnerlName] = useState("");
    const [winnerBranch, setWinnerBranch] = useState("");
    const [winnerYear, setWinnerYear] = useState("");
    const [winnerNoOfDoubtsAsked, setWinnerNoOfDoubtsAsked] = useState("");
    const [winneroOfDoubtsAnswered, setWinnerNoOfDoubtsAnswered] = useState("");
    const [winnerAvatar, setWinnerAvatar] = useState("");


    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;


    useEffect(() => {
        getUsers();
        getUserById();
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(users.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(users.length / itemsPerPage));
    });



    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    }


    const getUsers = async () => {

        let resultUsers = await fetch("http://localhost:5000/users");
        resultUsers = await resultUsers.json();
        setUsers(resultUsers);

        setUsers(resultUsers.sort(
            (p1, p2) => {
                let sum1 = p1.noOfDoubtsAsked + p1.noOfDoubtsAnswered;
                let sum2 = p2.noOfDoubtsAsked + p2.noOfDoubtsAnswered;

                if (sum1 > sum2) {
                    return -1;
                }
                if (sum1 < sum2) {
                    return 1;
                }

                return 0;
            }).filter(lUser => lUser.isAdmin === false));

        setWinner(users.find((obj, index) => {
            return index === 0;
        }));

        // setWinnerfName(winner.fName);

        setWinnerfName(resultUsers.sort(
            (p1, p2) => {
                let sum1 = p1.noOfDoubtsAsked + p1.noOfDoubtsAnswered;
                let sum2 = p2.noOfDoubtsAsked + p2.noOfDoubtsAnswered;

                if (sum1 > sum2) {
                    return -1;
                }
                if (sum1 < sum2) {
                    return 1;
                }

                return 0;
            }).find((obj, index) => {
                return index === 0;
            }).fName);

        setWinnerlName(resultUsers.sort(
            (p1, p2) => {
                let sum1 = p1.noOfDoubtsAsked + p1.noOfDoubtsAnswered;
                let sum2 = p2.noOfDoubtsAsked + p2.noOfDoubtsAnswered;

                if (sum1 > sum2) {
                    return -1;
                }
                if (sum1 < sum2) {
                    return 1;
                }

                return 0;
            }).find((obj, index) => {
                return index === 0;
            }).lName);

        setWinnerBranch(resultUsers.sort(
            (p1, p2) => {
                let sum1 = p1.noOfDoubtsAsked + p1.noOfDoubtsAnswered;
                let sum2 = p2.noOfDoubtsAsked + p2.noOfDoubtsAnswered;

                if (sum1 > sum2) {
                    return -1;
                }
                if (sum1 < sum2) {
                    return 1;
                }

                return 0;
            }).find((obj, index) => {
                return index === 0;
            }).branch);

        setWinnerYear(resultUsers.sort(
            (p1, p2) => {
                let sum1 = p1.noOfDoubtsAsked + p1.noOfDoubtsAnswered;
                let sum2 = p2.noOfDoubtsAsked + p2.noOfDoubtsAnswered;

                if (sum1 > sum2) {
                    return -1;
                }
                if (sum1 < sum2) {
                    return 1;
                }

                return 0;
            }).find((obj, index) => {
                return index === 0;
            }).year);

        setWinnerNoOfDoubtsAsked(resultUsers.sort(
            (p1, p2) => {
                let sum1 = p1.noOfDoubtsAsked + p1.noOfDoubtsAnswered;
                let sum2 = p2.noOfDoubtsAsked + p2.noOfDoubtsAnswered;

                if (sum1 > sum2) {
                    return -1;
                }
                if (sum1 < sum2) {
                    return 1;
                }

                return 0;
            }).find((obj, index) => {
                return index === 0;
            }).noOfDoubtsAsked);

        setWinnerNoOfDoubtsAnswered(resultUsers.sort(
            (p1, p2) => {
                let sum1 = p1.noOfDoubtsAsked + p1.noOfDoubtsAnswered;
                let sum2 = p2.noOfDoubtsAsked + p2.noOfDoubtsAnswered;

                if (sum1 > sum2) {
                    return -1;
                }
                if (sum1 < sum2) {
                    return 1;
                }

                return 0;
            }).find((obj, index) => {
                return index === 0;
            }).noOfDoubtsAnswered);



        
            setWinnerAvatar(resultUsers.sort(
                (p1, p2) => {
                    let sum1 = p1.noOfDoubtsAsked + p1.noOfDoubtsAnswered;
                    let sum2 = p2.noOfDoubtsAsked + p2.noOfDoubtsAnswered;
    
                    if (sum1 > sum2) {
                        return -1;
                    }
                    if (sum1 < sum2) {
                        return 1;
                    }
    
                    return 0;
                }).find((obj, index) => {
                    return index === 0;
                }).avatar);



        // setWinnerlName(winner.lName);
        // setWinnerBranch(winner.branch);
        // setWinnerYear(winner.year);
        // setWinnerNoOfDoubtsAsked(winner.noOfDoubtsAsked);
        // setWinnerNoOfDoubtsAnswered(winner.noOfDoubtsAnswered);


        //   console.log(winner.fName);
    }

    const getUserById = async () => {
        

        const idFetched = props.userId;
        let result = await fetch(`http://localhost:5000/user/${idFetched}`);
        result = await result.json();
        setNavbarName(`${result.fName} ${result.lName}`);
        setNavbarAvatar(result.avatar);
        // setUser(result);
    }


    

    return (
        <div>

            <div style={{ "padding": "2% 7% 1% 7%", }}>
                <Navbar navbarName={navbarName} createQuestionUserAvatar={navbarAvatar} userIdSent={props.userId}/>
            </div>

            <h1 className="leaderboard-main-heading">Leaderboard</h1>

            <div className="leaderboard-main-container">
                <div className="leaderboard-left-area">
                    <div className="left-area-inner">
                        {/* <img src="../ASSETS/leaderboard_left_pic.svg" alt="" className="winner-img" />  change img to avatar by using winnerAvatar */}
                        <img src={winnerAvatar} alt="" className="winner-img" />

                        <div className="winner-name">#1 {winnerfName} {winnerlName}</div>
                        <div className="winner-branch-year">{winnerBranch}, {winnerYear}</div>
                        <div className="winner-numbers"> Total Answered   {winneroOfDoubtsAnswered}</div>
                        <div className="winner-numbers"> Total Questions   {winnerNoOfDoubtsAsked}</div>


                        {/* <div className="winner-name">#1 {props.winnerfNameSent} {props.winnerlNameSent}</div>
                        <div className="winner-branch-year">{props.winnerBranchSent}, {props.winnerYearSent}</div>
                        <div className="winner-numbers"> Total Answered   {props.winneroOfDoubtsAnsweredSent}</div>
                        <div className="winner-numbers"> Total Questions   {props.winnerNoOfDoubtsAskedSent}</div> */}
                    </div>

                </div>

                <div className="leaderboard-right-area">

                    {/* {users.map((userItem, index) => { */}
                    {currentItems.map((userItem, index) => {
                        return (
                            <div className="right-area-inner">
                                <table className="leaderboard-student-table">
                                    <tr>
                                        <td className="student-index-column">
                                            <div className="student-index-div">
                                                {itemOffset + index + 1}
                                            </div>
                                        </td>
                                        <td className="student-name-column">
                                            <div className="student-name-div">
                                                {userItem.fName} {userItem.lName}
                                            </div>
                                        </td>
                                        <td className="student-branch-year-column">
                                            <div className="student-branch-year-div">
                                                <p>{userItem.branch}</p>
                                                <p>{userItem.year}</p>
                                            </div>
                                        </td>
                                        <td className="student-pnts-column">
                                            <div className="student-pnts-div">
                                                {userItem.noOfDoubtsAsked + userItem.noOfDoubtsAnswered} pts
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        );
                    })}

                   

                </div>
            </div>

            <ReactPaginate
                breakLabel="..."
                breakLinkClassName="leaderboard-page-number"
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination-container"
                pageLinkClassName="leaderboard-page-number"
                previousLinkClassName="leaderboard-page-number"
                nextLinkClassName="leaderboard-page-number"
                activeLinkClassName="active"
            />

        </div>


    );
}

export default Leaderboard;

