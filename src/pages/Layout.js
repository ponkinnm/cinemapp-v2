import {Outlet, NavLink, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser, logOut} from "../features/auth/authSlice";
import {motion} from "framer-motion";

// TODO: Review
function Layout() {

    const user = useSelector(selectUser);

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
                        <li style={{cursor: 'pointer'}} onClick={logOut} className={"menu__item"}>
                            Log out
                        </li>
                        <li className={"menu__item"}>
                            <NavLink
                                to="highscore">High Score</NavLink>
                        </li>
                    </>}
                </ul>
            </nav>
            <motion.main initial={{opacity: 0}}
                         animate={{opacity: 1}}
                         exit={{
                             opacity: 0,
                         }}
                         transition={{
                             duration: 0.15,
                             ease: [0.43, 0.13, 0.23, 0.96],
                         }}
                         className="main-content">
                <Outlet/>
            </motion.main>
        </>
    )

}

export default Layout;
