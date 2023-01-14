/* eslint-disable */
import React, { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateQuestion(props) {


    const [isActive, setIsActive] = useState(false);


    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [_id, set_id] = useState("");
    const [approved, setApproved] = useState(false);
    const [notified, setNotified] = useState(false);

    const [user, setUser] = useState({
        email: "", password: "", fName: "", lName: "", branch: "", year: ""
    });


    const showToastMessage = () => {
        toast.success("Question submitted! Please wait for question to be approved.", {
            onClose: () => {
              console.log("closing");
            },
            autoClose: 2500
          });
    };



    const getUserById = async () => {


        const id = props.userIdSent;
        let result = await fetch(`http://localhost:5000/user/${id}`);
        result = await result.json();
        console.log(result);
        // setUser(result);

        set_id(result._id);

        // setPassword(result.password);
        setfName(result.fName);
        setlName(result.lName);
        setEmail(result.email);
     
        setBranch(result.branch);
        setYear(result.year);
        setApproved(false);
        setNotified(false);
      
    }

   
    const handlePopUpClickAndSubmitQuestion = async (event) => {
        

        if (category === "") {
            alert("Please select category!");
        }
        else {
            


            // const user = {
            //     _id: _id,
            //     email: email,
            //     // password: password,
            //     fName: fName,
            //     lName: lName,
            //     branch: branch,
            //     year: year
            // }


            const user = {
                _id: props.userIdSent
                // email: props.userEmailSent,
                // // password: password,
                // fName: props.userfNameSent,
                // lName: props.userlNameSent,
                // branch: props.userBranchSent,
                // year: props.userYearSent,
                // avatar: props.userAvatarSent
            }

            console.log('object i created', JSON.stringify(user));


            let result = await fetch("http://localhost:5000/createquestion", {
                method: "post",
                body: JSON.stringify({ content, category, user, approved, notified }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            result = await result.json();                //result is the object which finally contains the question stored in the database
            console.log(result);
            
            if(result.user.fName && result.content){               //changed
                // alert("Question submitted");
                showToastMessage();
            }
            // else{
            //     alert("Some problem occurred. Try again!");
            // }




            // let resultNoOfDoubtsAsked = await fetch(`https://ask-your-seniors-backend.vercel.app/user-increment-noOfDoubtsAsked/${props.userIdSent}`, {                 //this result gets the value of res.send()
            //     method: 'Put',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });

            // resultNoOfDoubtsAsked = await resultNoOfDoubtsAsked.json();


            // setCategory("");
            // setContent("");

        
            event.preventDefault();        
           
        }

    }

    // function handlePopUpClick(event) {   
    //     getUserById();
    //     console.log(isActive);
    //     setIsActive(!isActive);
    // }



    // function handleChange(event) {
    //     const { name, value } = event.target;

    //     setQuestion(prevQuestion => {
    //         return {
    //             ...prevQuestion,
    //             [name]: value
    //         };
    //     });
    // }



    return (
        <div>
            

            {/* <p>{props.userIdSent}</p>
            <p>{props.userEmailSent}</p>
            <p>{props.userfNameSent}</p> */}

            <div className="post-doubt-container">
                <input
                    type="text"
                    className="post-doubt-input-box"
                    placeholder="Ask Your Doubt"
                    name="content"
                    onChange={(event) => { setContent(event.target.value) }}
                    value={content}
                />

                <div className="post-doubt-button-container">
                    


                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle id="dropdown-custom-1" className="post-doubt-category-button" style={{
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
                            {/* <Dropdown.Item eventKey="1" onClick={() => { setCategory("Programming"); getUserById(); }}>Programming</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={() => { setCategory("Placement"); getUserById(); }}>Placement</Dropdown.Item>
                            <Dropdown.Item eventKey="3" onClick={() => { setCategory("Web Dev"); getUserById(); }}>Web Dev</Dropdown.Item>
                            <Dropdown.Item eventKey="4" onClick={() => { setCategory("ML/AI"); getUserById(); }}>ML/AI</Dropdown.Item>
                            <Dropdown.Item eventKey="5" onClick={() => { setCategory("AR/VR"); getUserById(); }}>AR/VR</Dropdown.Item>
                            <Dropdown.Item eventKey="6" onClick={() => { setCategory("College"); getUserById(); }}>College</Dropdown.Item>
                            <Dropdown.Item eventKey="7" onClick={() => { setCategory("Others"); getUserById(); }}>Others</Dropdown.Item> */}

                            <Dropdown.Item eventKey="1" onClick={() => { setCategory("Programming"); }}>Programming</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={() => { setCategory("Placement"); }}>Placement</Dropdown.Item>
                            <Dropdown.Item eventKey="3" onClick={() => { setCategory("Web Dev"); }}>Web Dev</Dropdown.Item>
                            <Dropdown.Item eventKey="4" onClick={() => { setCategory("ML/AI");}}>ML/AI</Dropdown.Item>
                            <Dropdown.Item eventKey="5" onClick={() => { setCategory("AR/VR"); }}>AR/VR</Dropdown.Item>
                            <Dropdown.Item eventKey="6" onClick={() => { setCategory("College");}}>College</Dropdown.Item>
                            <Dropdown.Item eventKey="7" onClick={() => { setCategory("Others"); }}>Others</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


                    <button className="post-doubt-post-button" onClick={handlePopUpClickAndSubmitQuestion}>
                        <p>Post</p>
                    </button>

                    
                </div>

            </div>

            <ToastContainer />
        </div>
    );
}

export default CreateQuestion;