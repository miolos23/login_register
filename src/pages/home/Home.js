import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import { removeUser, setUser } from "../login/store/actions";

function Home() {

    const dispatch = useDispatch();
    const userStore = useSelector(store => store.userStore);
    const history = useNavigate();

    useEffect(() => {
        if (AuthService.getUserData() === null) {
            history('/')
        }
        if (userStore) {
            dispatch(setUser(AuthService.getUserData()))
        }
    }, [])

    const onLogout = () => {
        AuthService.onLogout(history);
        dispatch(removeUser());
    }

    return (
        <div className="container">
            <h1>Home page</h1>
            <h2>Hello {userStore.name}</h2>
            <button onClick={onLogout} className="btn btn-warning">Logout</button>
        </div>
    )
}

export default Home;