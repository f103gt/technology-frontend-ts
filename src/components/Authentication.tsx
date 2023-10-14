import React, {Component} from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext, {User, UserContextType} from '../context/UserContext';

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

        fetch('api/v1/auth/authenticate', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.status === 200) {
                    return Promise.all([response.json(), response.headers]);
                } else {
                    return Promise.reject('Invalid login attempt');
                }
            })
            .then(([body, headers]) => {
                console.log(headers);
                console.log(body);

                const token = headers.get("Authorization");
                if(token){
                    const tokenParts = token.split(".");
                    const payload = JSON.parse(atob(tokenParts[1])
                        .replace(/-/g, '+')
                        .replace(/_/g, '/'));
                    const userData: User = {
                        username: payload.username,
                        role: payload.role,
                    };

                    document.cookie = `userRole=${payload.role};path=/`;
                    (this.context as UserContextType).login(userData);
                    this.props.navigate('/home');
                }else{
                    throw new Error("Authorization token not found");
                }
            })
            .catch((message) => alert(message));
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

Authentication.contextType = UserContext;

const withNavigation = (Component: any) => {
    return (props: any) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate}/>;
    };
}

export default withNavigation(Authentication);
