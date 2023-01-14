import React, {useEffect, useState} from 'react';
import SignUpView from "../views/SignUpView";
import {signUp, setUser, login} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import LoginView from "../views/LoginView";
import {checkIfUsernameAlreadyTaken, writeUserToDatabase} from "../util/databaseFunctions";

function AuthPresenter() {
    const [hasAccount, setHasAccount] = useState(true);
    const [error, setError] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordChecker, setPasswordChecker] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();



    async function handleSignup() {
        setError("");
        if (passwordChecker !== password) {
            setError("Passwords do not match")
            return;
        }
        try {
            await checkIfUsernameAlreadyTaken(displayName, email);
            const user = await signUp(email, password, displayName);
            writeUserToDatabase(displayName, email);
            dispatch(setUser(user))

        } catch (err) {
            if (err.message.includes("email")) {
                setError("Email already in use");
            } else if (err.message.includes("weak-password")) {
                setError("Password should be at least 6 characters")
            } else {
                setError(err.message);
            }
        }
    }

    useEffect(() => {
        setError("");
    }, [hasAccount])


    async function handleLogin() {
        setError("");
        try {
            const user = await login(email, password);
            dispatch(setUser(user));
            navigate('/');
        } catch (err) {
            if (err.message.includes("password")) {
                setError("Invalid password");
            } else {
                setError("Wrong email");
            }
        }
    }

    return (
        !hasAccount ? <SignUpView setDisplayName={setDisplayName} setEmail={setEmail} setPassword={setPassword}
                                  setPasswordChecker={setPasswordChecker} setHasAccount={setHasAccount} error={error}
                                  handleSubmit={handleSignup}/> :
            <LoginView setPassword={setPassword} setEmail={setEmail} setHasAccount={setHasAccount} error={error}
                       handleSubmit={handleLogin}/>
    );
}

export default AuthPresenter;
