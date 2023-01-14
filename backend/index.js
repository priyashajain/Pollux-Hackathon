require("dotenv").config();
const express = require("express");
require("./db/config");
const User = require("./db/User");
const Question = require("./db/Question");
const Answer = require("./db/Answer");
const session = require('express-session');
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
// const bcrypt = require("bcrypt");


const app = express();
app.use(express.json());              //middleware
app.use(express.urlencoded({ extended: true }))

// app.set('trust proxy', 1);

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
        // sameSite: "none",
        // secure: true
	})
);



app.use(passport.initialize());
app.use(passport.session());



app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);



// app.use(cors());

const saltRounds = 10;

app.use("/auth", authRoute);








app.get("/", (req, res) => {
    res.send("app is working");
});





app.get("/user/:id", async (req, res) => {
    // let result = await User.findOne({ email: req.params.id });
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No user found" });
    }

});

app.get("/question/:id", async (req, res) => {
    let result = await Question.findOne({ _id: req.params.id }).populate('user').exec();
    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No question found" });
    }

});

app.get("/answers/:questionid", async (req, res) => {
    let answers = await Answer.find({ 'question': req.params.questionid }).populate('user').populate({
        path: 'question',
        populate: 
            {
                path: 'user',
                model: 'users',
            }
    }).exec();

    res.send(answers);

});


app.get("/questions-from-user-id/:userid", async (req, res) => {                              //for my questions
    let questions = await Question.find({ 'user': req.params.userid }).populate('user').exec();

    res.send(questions);

});


app.get("/answers-from-user-id/:userid", async (req, res) => {                                //???????????????
    let answers = await Answer.find({ 'user': req.params.userid }).populate('user').populate({
        path: 'question',
        populate: 
            {
                path: 'user',
                model: 'users',
            }
    }).exec();

    res.send(answers);

});


app.get("/question-from-answer-id/:answerid", async (req, res) => {                                  //i think this one's not needed???????????????
    let question = await Question.findOne({ 'user': req.params.answerid }).populate('user').exec();
    if (question) {
        res.send(question);
    }
    else {
        res.send({ "result": "No answers found" });
    }

});



app.get("/users", async (req, res) => {
    let users = await User.find();
    if (users.length > 0) {
        res.send(users);
    }
    else {
        res.send({ result: "No users found" });
    }

});

app.get("/questions", async (req, res) => {
    let questions = await Question.find().populate('user').exec();

    res.send(questions);


});

app.get("/all-answers", async (req, res) => {
    let answers = await Answer.find().populate('user').populate({
        path: 'question',
        populate: 
            {
                path: 'user',
                model: 'users',
            }
    }).exec();
    res.send(answers);

});


app.delete("/delete-answer/:id", async (req, res) => {
    let result = await Answer.deleteOne({ _id: req.params.id });
    res.send(result);
});


app.delete("/delete-question/:id", async (req, res) => {
    let result = await Question.deleteOne({ _id: req.params.id });
    res.send(result);
});


app.put("/update-answer/:id", async (req, res) => {
    let result = await Answer.updateOne(
        { _id: req.params.id },
        {
            // $set : {content: req.body}
            $set: req.body
        }
    );

    res.send(result);
})


app.put("/update-question-approved/:id", async (req, res) => {
    let result = await Question.updateOne(
        { _id: req.params.id },
        {
            // $set : {content: req.body}
            $set: req.body
        }
    );

    res.send(result);
})


app.put("/update-answer-approved/:id", async (req, res) => {
    let result = await Answer.updateOne(
        { _id: req.params.id },
        {
            // $set : {content: req.body}
            $set: req.body
        }
    );

    res.send(result);
})

app.put("/update-answer-solved/:id", async (req, res) => {
    let result = await Answer.updateOne(
        { _id: req.params.id },
        {
            // $set : {content: req.body}
            $set: req.body
        }
    );

    res.send(result);
})


app.post("/createquestion", async (req, res) => {
    let question = new Question(req.body);             //???????if req.body.user.fName, then only save???????
    let result = await question.save();
    result = result.toObject();
    // delete result.password;      
    // res.send(result);

    let populatedQuestion = await Question.findOne({ _id: result._id}).populate('user').exec();   
    populatedQuestion = populatedQuestion.toObject();
    res.send(populatedQuestion);
})


app.post("/createanswer", async (req, res) => {
    let answer = new Answer(req.body);
    let result = await answer.save();
    result = result.toObject();
    // delete result.password;      
    // res.send(result);

    let populatedAnswer = await Answer.findOne({ _id: result._id}).populate('user').populate({
        path: 'question',
        populate: 
            {
                path: 'user',
                model: 'users',
            }
    }).exec();
    
    populatedAnswer = populatedAnswer.toObject();
    res.send(populatedAnswer);
    // res.send(populatedAnswer.question.user.fName);
})





app.put("/user/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );

    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No user found" });
    }
})



app.put("/update-user-approved/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );

    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No user found" });
    }
})









app.put("/user-increment-noOfDoubtsAsked/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        { 
            $inc: { noOfDoubtsAsked: 1 } 
        }
    );

    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No user found" });
    }
})



app.put("/user-increment-noOfDoubtsAnswered/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        { 
            $inc: { noOfDoubtsAnswered: 1 } 
        }
    );

    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No user found" });
    }
})



app.listen(5000, () => {
    console.log('App is running at port: 5000')
});

