import './App.css';
import {BrowserRouter} from "react-router-dom";
import AnimatedRoutes from "./presenters/AnimatedRoutes";
import {useDispatch} from "react-redux";
import {setUser} from "./features/auth/authSlice";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebaseConfig";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => dispatch(setUser(user?.toJSON())))
    }, [])

    return (
        <BrowserRouter>
            <AnimatedRoutes/>
        </BrowserRouter>
    );
}

export default App;
