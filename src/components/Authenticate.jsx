import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
/*import Cookies from "js-cookie";*/


const Authenticate = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    function sendAuthRequest(event) {
        event.preventDefault();
        const requestBody = {
            email: username,
            password: password,
        }
        fetch("api/v1/auth/authenticate", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(requestBody),
        })
            .then((
                response) => {
                if (response.status === 200){
                    return Promise.all([response.json(), response.headers]);
                }

                else
                    return Promise.reject("Invalid login attempt");
            })
            .then(([body, headers]) => {
                /*Cookies.set("user",body.get())*/
                navigate("/home");
            })
            .catch((message) => alert(message));
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                           value={username} onChange={(event) => setUsername(event.target.value)}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"
                           value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="checkBox"/>
                    <label className="form-check-label" htmlFor="checkBox">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event) => sendAuthRequest(event)}>Login</button>
            </form>
        </div>
    );
};

export default Authenticate;