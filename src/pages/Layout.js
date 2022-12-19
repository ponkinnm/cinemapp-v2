import {Outlet, NavLink, Link} from "react-router-dom";
import SignOutButton from "../SignOutButton";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, setUser} from "../features/auth/authSlice";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebaseConfig";

function Layout() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => dispatch(setUser(user?.toJSON())))
    }, [])

    return (

        <>
            <nav className={"navigation"}>
                <Link className={"logo"} to="/">
                    <span className="font-accent">CinemApp</span>
                </Link>

                <ul className="menu">
                    {user && <>
                        <li className={"menu__item"}>
                            <NavLink
                                to="game">Quiz</NavLink>
                        </li>
                        <li className={"menu__item"}>
                            <div>User:{user.displayName}</div>
                        </li>
                        <li className={"menu__item"}>
                            <SignOutButton/>
                        </li>
                        <li className={"menu__item"}>
                            <NavLink
                                to="highscore">High Score</NavLink>
                        </li>
                    </>}
                </ul>
            </nav>
            <div className="main-content">
                <Outlet/>
            </div>
        </>
    )

}

export default Layout;
