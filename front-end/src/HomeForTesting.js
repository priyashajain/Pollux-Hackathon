
import React from "react";

function HomeForTesting(userDetails) {
	const userId = userDetails.userId;
	const userGoogleId = userDetails.userGoogleId;
	const userName = userDetails.userName;
		// console.log(user);
	const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
	};
	return (
		<div>
			
					{/* <img
						src={user.picture}
						alt="profile"
					/> */}

                    <p>{userId}</p>
					<p>{userGoogleId}</p>
					
                    {/* <p>{userDetails.user.googleId}</p> */}

					
					<button onClick={logout}>
						Log Out
					</button>
				
		</div>
	);
}

export default HomeForTesting;