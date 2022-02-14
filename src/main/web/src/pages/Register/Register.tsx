import React, { useState } from "react";
import { useHistory } from "react-router";
import { User } from "../../Interfaces/user";
import * as UserUtil from "../../utils/UserUtil"
import '../../App.css';

function Register() {

    const [userData, setUserData] = useState<User>({
        firstName: '',
        lastName: '',
        userName: '',
        status: 'none'
    })
    let history = useHistory();

    const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }
    const submitButton = () => {
        console.log(userData)
        UserUtil.createUSer(userData)
            .then((resp) => {
                console.log(resp)
                history.push(`/login`)
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.status);
                    if (error.response.status === 409) {
                        window.alert('username alredy exists')
                    }
                }
            })
    }

    function goToLogin() {
        history.push(`/login`)
    }


    return (
        <div>
            <h1 className="labels heading">Register</h1>
            <div className="flex">
                <label htmlFor="firstName" className="labels">First Name:</label>
                <input
                    className="input"
                    type="text"
                    name="firstName"
                    onChange={(e) => inputsHandler(e)}
                    placeholder="First Name"
                    value={userData.firstName} />
            </div>

            <div className="flex">
                <label htmlFor="firstName" className="labels">Last Name:</label>
                <input
                    className="input"
                    type="text"
                    name="lastName"
                    onChange={(e) => inputsHandler(e)}
                    placeholder="Last Name"
                    value={userData.lastName} />
            </div>

            <div className="flex">
                <label htmlFor="firstName" className="labels">User Name:</label>

                <input
                    className="input"
                    type="text"
                    name="userName"
                    onChange={(e) => inputsHandler(e)}
                    placeholder="User Name"
                    value={userData.userName} />
            </div>
            <div>
                <button className="btn btn2" onClick={goToLogin}>Login</button>
                <button className="btn btn1" onClick={submitButton}>Submit</button>
            </div>
        </div>
    );
}

export default Register;