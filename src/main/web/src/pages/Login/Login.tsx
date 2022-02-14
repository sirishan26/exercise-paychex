import React, { useState } from "react";
import { useHistory } from "react-router";
import * as UserUtil from "../../utils/UserUtil"
import '../../App.css';

function Login() {

    let history = useHistory();

    const [userName, setUserName] = useState<string>('');

    const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserName(value);
    }

    function goToRegister() {
        history.push(`/register`)
    }

    const submitButton = () => {
        console.log(userName)
        UserUtil.getUserByUserName(userName)
            .then((resp) => {
                console.log(resp)
                history.push(`/${userName}/dashboard`)
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.status);
                    if (error.response.status === 409) {
                        window.alert('username alredy exists')
                    }
                }
            })
    }

    return (
        <div>

            <div className="flex">
                <label htmlFor="userName" className="labels">User Name:</label>
                <input
                    className="input"
                    type="text"
                    name="userName"
                    onChange={(e) => inputsHandler(e)}
                    placeholder="User Name"
                    value={userName} />

            </div>

            <div>
                <button className="btn btn2" onClick={goToRegister}>Register</button>
                <button className="btn btn1" onClick={submitButton}>login</button>
            </div>
        </div>
    );
}
export default Login;