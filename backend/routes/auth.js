const router = require("express").Router();
const passport = require("passport");


router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
		// res.send(req.user)
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	// res.status(401).json({
	// 	error: true,
	// 	message: "Log in failure",
	// });
	res.send("Login failed");
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

// router.get("/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: process.env.CLIENT_URL,
// 		// successRedirect: "/helloworld",
// 		failureRedirect: "/login/failed",
// 	})
// );

router.get("/google/callback",
	passport.authenticate('google', { failureRedirect: "/login/failed" }),
	function (req, res) {
		// Successful authentication, redirect home.
		if(req.user.isAdmin){
			
			res.redirect("http://localhost:3000/admin");
		}
		else{
			
			if(req.user.branch){
				res.redirect("http://localhost:3000/ask-your-doubts");
				// res.redirect("http://localhost:3000/home");
			}
			else{
				res.redirect(`http://localhost:3000/details/${req.user._id}`);
				// res.redirect(`http://localhost:3000/details`);
			}
		}
		
		// res.redirect(process.env.CLIENT_URL);                   //??????????????can we do conditional redirect here, based on user.name, from req.user ????????????????, if this works, can we do admin routing too
		// res.redirect("/helloworld");
		// res.send("login successful!");
	}
);

router.get("/logout", (req, res) => {
	
	req.logout();
	res.redirect("http://localhost:3000/");
});

router.get("/helloworld", (req, res) => {
	res.send("hello world is working!");
})

module.exports = router;