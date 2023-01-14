/* eslint-disable */

import React, {useState} from "react";
import "./Details.css";
import { useParams, useNavigate } from "react-router-dom";

const Details = () => {

    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    // const [isAdmin, setIsAdmin] = useState(false);
    // setIsAdmin(false);
    const noOfDoubtsAsked = 0;
    const noOfDoubtsAnswered = 0;
    const isAdmin = false;
    const params = useParams();
    const navigate = useNavigate();

    const collectData = async () => {                                   //connecting react to backend 
        

        let result = await fetch(`http://localhost:5000/user/${params.id}`, {                 //this result gets the value of res.send()
            method: 'Put',
            body: JSON.stringify({ fName, lName, branch, year, noOfDoubtsAsked, noOfDoubtsAnswered, isAdmin }),
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
                <p class="details-heading">Details</p>
                <p class="fill-in-heading">Fill your details to continue</p>
            </div>



            <table>
                <tr>
                    <td>
                        <div class="input-and-label-cell">
                            <label for="" class="input-label">First Name</label>
                            <input type="text" id="" class="input-box" placeholder="Enter first name" name="fName" value={fName} onChange={(event) => { setfName(event.target.value) }} />
                        </div>

                    </td>
                    <td>
                        <div class="input-and-label-cell">
                            <label for="" class="input-label">Last Name</label>
                            <input type="text" id="" class="input-box" placeholder="Enter last name" name="lName" value={lName} onChange={(event) => { setlName(event.target.value) }} />
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="input-and-label-cell">
                            <label for="" class="input-label">Branch</label>
                            <input type="text" id="" class="input-box" placeholder="Enter branch" name="branch" value={branch} onChange={(event) => { setBranch(event.target.value) }} />
                        </div>
                    </td>
                    <td>
                        <div class="input-and-label-cell">
                            <label for="" class="input-label">Graduation Year</label>
                            <input type="text" id="" class="input-box" placeholder="Enter graduation year" name="year" value={year} onChange={(event) => { setYear(event.target.value) }} />
                        </div>
                    </td>
                </tr>
            </table>

            <button class="details-submit-button" onClick={collectData}>Continue</button>
            {/* <button class="details-submit-button">Continue</button> */}

        </div>
    );
}

export default Details;