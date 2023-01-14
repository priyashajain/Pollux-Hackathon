/* eslint-disable */

import React, {useState, useEffect} from "react";
import "./Details.css";
import { useParams, useNavigate } from "react-router-dom";


const Profile = (props) => {

    const [fName, setfName] = useState(props.userfNameSent);
    const [lName, setlName] = useState(props.userlNameSent);
    const [branch, setBranch] = useState(props.userBranchSent);
    const [year, setYear] = useState(props.userYearSent);

    const [displayfName, setDisplayfName] = useState(props.userfNameSent);
    const [displaylName, setDisplaylName] = useState(props.userlNameSent);
    const [displayBranch, setDisplayBranch] = useState(props.userBranchSent);
    const [displayYear, setDisplayYear] = useState(props.userYearSent);

    // const [displayfName, setDisplayfName] = useState("");
    // const [displaylName, setDisplaylName] = useState("");
    // const [displayBranch, setDisplayBranch] = useState("");
    // const [displayYear, setDisplayYear] = useState("");
   
    // const noOfDoubtsAsked = 0;
    // const noOfDoubtsAnswered = 0;
    // const isAdmin = false;

    const params = useParams();
    const navigate = useNavigate();


    // useEffect(() => {
    //     // getUserDetails();
    //     setfName(props.userfNameSent);
    // }, []);

    
    // const getUserDetails = async () => {
    //     let userDetails = await fetch(`http://localhost:5000/user/${params.id}`);
    //     userDetails = await userDetails.json();
    
    //     setfName(result.fName);
    //     setlName(result.lName);
    //     setBranch(result.branch);
    //     setYear(result.year);

    //     // setDisplayfName(result.fName);
    //     // setDisplaylName(result.lName);
    //     // setDisplayBranch(result.branch);
    //     // setDisplayYear(result.year);
        
    // }

    const updateProfile = async () => {                                   
        let result = await fetch(`http://localhost:5000/user/${params.id}`, {                 
            method: 'Put',
            body: JSON.stringify({ fName, lName, branch, year }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        
        if (result) {                       
            navigate("/ask-your-doubts");
        }
        
    }

    return (
        <div>
            {/* <h1>Details</h1> */}
            <img src="../ASSETS/Frame 21.svg" alt="" class="cb-logo" />

            <div class="headings">
                <p class="details-heading">Profile</p>
                {/* <p class="fill-in-heading">Fill your details to continue</p> */}
            </div>



            <table>
                <tr>
                    <td>
                        <div class="input-and-label-cell">
                            <label for="" class="input-label">First Name</label>
                            <input type="text" id="" class="input-box" placeholder="Enter first name" name="fName" value={displayfName} onChange={(event) => { setfName(event.target.value); setDisplayfName(event.target.value);}} />
                        </div>

                    </td>
                    <td>
                        <div class="input-and-label-cell">
                            <label for="" class="input-label">Last Name</label>
                            <input type="text" id="" class="input-box" placeholder="Enter last name" name="lName" value={displaylName} onChange={(event) => { setlName(event.target.value); setDisplaylName(event.target.value); }} />
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="input-and-label-cell">
                            <label for="" class="input-label">Branch</label>
                            <input type="text" id="" class="input-box" placeholder="Enter branch" name="branch" value={displayBranch} onChange={(event) => { setBranch(event.target.value); setDisplayBranch(event.target.value); }} />
                        </div>
                    </td>
                    <td>
                        <div class="input-and-label-cell">
                            <label for="" class="input-label">Graduation Year</label>
                            <input type="text" id="" class="input-box" placeholder="Enter graduation year" name="year" value={displayYear} onChange={(event) => { setYear(event.target.value);  setDisplayYear(event.target.value);}} />
                        </div>
                    </td>
                </tr>
            </table>

            <button class="details-submit-button" onClick={updateProfile}>Edit</button>
            {/* <button class="details-submit-button">Continue</button> */}

        </div>
    );
}

export default Profile;