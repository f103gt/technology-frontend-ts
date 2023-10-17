import React, {Component} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

interface AuthenticateProps {
    navigate: (path: string) => void;
}

class Authentication extends Component<AuthenticateProps> {
    state = {
        username: '',
        password: '',
    };

    //TODO consider whether the user email is needed to be placed in the context

    updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: event.target.value});
    }

    updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value});
    }

    sendAuthRequest = (event: React.FormEvent) => {
        event.preventDefault();
        const {username, password} = this.state;
        const requestBody = {
            email: username,
            password: password,
        };

        axios.get("/csrf/api/v1")
            .then(response => {
                const csrfToken = response.data.headers;
                axios({
                    method: 'post',
                    url: "/api/v1/auth/authenticate",
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    withCredentials: true
                })
                    .catch(error => {
                        alert(error)
                    });
            });
    }

    render() {
        return (
            <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                               value={this.state.username} onChange={this.updateUsername}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"
                               value={this.state.password} onChange={this.updatePassword}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="checkBox"/>
                        <label className="form-check-label" htmlFor="checkBox">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.sendAuthRequest}>Login</button>

                </form>
            </div>
        );
    }
}

const withNavigation = (Component: any) => {
    return (props: any) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate}/>;
    };
}

export default withNavigation(Authentication);
