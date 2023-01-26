import React, { useState } from "react";
import AuthService from "../../services/auth-service";
import { useDispatch } from "react-redux";
import { setUser } from "./store/actions";
import { useNavigate } from "react-router-dom";

function Login() {

    const [state, setState] = useState({ username: "", password: "" });
    const dispatch = useDispatch();
    const history = useNavigate();


    const onLogin = () => {
        AuthService.login(state)
            .then(res => {
                AuthService.storeUserData(res.data);
                dispatch(setUser(res.data));
                history('/home');
            })
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <div className="col-6 offset-3">
                <input type="text" placeholder="name" className="form-control"
                    onChange={event => setState({ ...state, username: event.target.value })}
                /><br />
                <input type="password" placeholder="password" className="form-control"
                    onChange={event => setState({ ...state, password: event.target.value })}
                /><br />
                <button onClick={onLogin} className="btn btn-info">Login</button>
            </div>

        </div>
    )
}

export default Login;