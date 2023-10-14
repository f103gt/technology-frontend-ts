import React, {Component} from "react";
import UserContext, {User} from "./UserContext";

interface UserProviderProps {
    children: React.ReactNode;
}

class UserProvider extends Component<UserProviderProps> {
    state = {
        user: null,
    };

    login = (userData: User) => {
        this.setState({ user: userData });
    };

    logout = () => {
        this.setState({ user: null });
    }

    render() {
        return (
            <UserContext.Provider
                value={{
                    user: this.state.user,
                    login: this.login,
                    logout: this.logout,
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;