/* eslint-disable */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import HomeCorrect from './components/HomeCorrect';
import Details from "./components/Details";
import AskYourDoubts from "./components/AskYourDoubts";
import Leaderboard from "./components/Leaderboard";
import Admin from './components/Admin';
import HomeCorrectForLoggedIn from "./components/HomeCorrectForLoggedIn";
import Profile from "./components/Profile";

import HomeForTesting from "./HomeForTesting";
import LoginForTesting from "./LoginForTesting";
import SignUpForTesting from "./SignUpForTesting";

import "./App.css";


function App() {
	const [user, setUser] = useState(null);
	const [userId, setUserId] = useState("");
	const [userGoogleId, setUserGoogleId] = useState("");
	// const [userName, setUserName] = useState("");
	const [userIsAdmin, setUserIsAdmin] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [userfName, setUserfName] = useState("");
	const [userlName, setUserlName] = useState("");
	const [userBranch, setUserBranch] = useState("");
	const [userYear, setUserYear] = useState("");

	const [userAvatar, setUserAvatar] = useState("");
	const [navbarName, setNavbarName] = useState("");


	const getUser = async () => {
		try {
			
			const url = `http://localhost:5000/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });

			// console.log(data);
			
			setUser(data.user._json);
			setUserId(data.user._id);
			setUserGoogleId(data.user.googleId);
			setUserIsAdmin(data.user.isAdmin);
			setUserEmail(data.user.email);
			setUserfName(data.user.fName);
			setUserlName(data.user.lName);
			setUserBranch(data.user.branch);
			setUserYear(data.user.year);
			setUserAvatar(data.user.avatar);
			setNavbarName(`${data.user.fName} ${data.user.lName}`);

			// console.log(userIsAdmin);
		}

		catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	});




	return (
		<BrowserRouter>
			<div>
				<Routes>

					<Route
						exact
						path="/home"
						element={<HomeForTesting userId={userId} userGoogleId={userGoogleId} userEmailSent={userEmail} userfNameSent={userfName} userlNameSent={userlName} userBranchSent={userBranch} userYearSent={userYear} />}
					/>
					

					<Route
						exact
						path="/"
						// element={<HomeCorrect />}
						element={userId!=="" ?  <HomeCorrectForLoggedIn navbarName={navbarName} userAvatarSent={userAvatar}/> : <HomeCorrect /> }
					/>
					<Route
						exact
						path="/signin"
						element={<LoginForTesting />}
					/>
					<Route
						path="/signup"
						element={<SignUpForTesting />}
					/>


					<Route
						exact
						path={`/details/:id`}
						element={<Details />}
					/>
					<Route
						exact
						path={`/profile/:id`}
						element={<Profile userfNameSent={userfName} userlNameSent={userlName} userBranchSent={userBranch} userYearSent={userYear}/>}
					/>
					<Route
						path={`/ask-your-doubts`}
						element={<AskYourDoubts userId={userId} userGoogleId={userGoogleId} userEmailSent={userEmail} userfNameSent={userfName} userlNameSent={userlName} userBranchSent={userBranch} userYearSent={userYear} />}
					/>
					<Route
						path={`/leaderboard`}
						element={<Leaderboard  userId={userId} userGoogleId={userGoogleId} />}
						// element={<Leaderboard userId={userId} userGoogleId={userGoogleId} winnerfNameSent={winnerfName} winnerlNameSent={winnerlName} winnerBranchSent={winnerBranch} winnerYearSent={winnerYear} winnerNoOfDoubtsAskedSent={winnerNoOfDoubtsAsked} winneroOfDoubtsAnsweredSent={winneroOfDoubtsAnswered} />}
					/>
					
	
					<Route
						path={`/admin`}
						element={<Admin />}
					/>
					

				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
