import {Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import Layout from "../pages/Layout";
import Welcome from "./Welcome";
import GenrePresenter from "./GenrePresenter";
import NoPageView from "../views/NoPageView";
import HighScorePresenter from "./HighScorePresenter";

// TODO Open Issue - What am I? Where to put me?
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode={"wait"}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Welcome/>}/>
                    <Route path="game" element={<GenrePresenter/>}/>
                    <Route path="*" element={<NoPageView/>}/>
                    <Route path="highscore" element={<HighScorePresenter/>}/>
                </Route>
            </Routes>
        </AnimatePresence>
    )
}
export default AnimatedRoutes;