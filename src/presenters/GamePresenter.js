import React, {useCallback, useEffect, useState} from 'react';
import Question from "../views/gameplay/Question";
import QuoteBox from "../views/gameplay/QuoteBox";
import CorrectResultBox from "../views/gameplay/CorrectResultBox";
import BadResultBox from "../views/gameplay/BadResultBox";
import LoadingScreenView from '../views/LoadingScreenView'
import HintView from "../views/gameplay/HintView"
import {useDispatch, useSelector} from "react-redux";
import {gameSliceAction} from "../features/game/gameSlice";
import {fetchAndAddMoviesToStore} from "../features/game/gameApiActions";
import {useNavigate} from "react-router-dom";
import uploadScoreToFirebase from "../util/databaseFunctions";
import {selectUser} from "../features/auth/authSlice";

// TODO CreateAction, extraReducers? Stream line
function GamePresenter() {
    const NUMBEROFMOVIES = 3

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const isAnswerCorrect = useSelector(state => state.game.correctAnswer)
    const hasSubmittedAnswer = useSelector(state => state.game.hasSubmittedAnswer)
    const movieIds = useSelector(state => state.game.movieIds)
    const totalScore = useSelector(state => state.game.totalScore)
    const newGame = (delay = 2500) => {setTimeout(gameSetUp, delay)}
    const user = useSelector(selectUser);

    const gameSetUp = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        dispatch(gameSliceAction.startSet())
        try {
            await dispatch(fetchAndAddMoviesToStore(movieIds, NUMBEROFMOVIES))
        } catch (err){
            // console.error(err)
            setError(err.message)
            // newGame(200);
        }
        setIsLoading(false)
    }, [])

    useEffect(() =>{
        console.log("Effect running game set up ")
        setIsLoading(true)
        setError(null)
        gameSetUp();
        return () => {
            console.log("Effect clean up game set up")
        }
    }, [gameSetUp])

    function nextSetACB() {
        if (totalScore) {
            uploadScoreToFirebase(user, totalScore);
            navigate('/highscore')
        } else {
            newGame()
        }
    }

    // TODO Error should have its own view! Prio: NICE TO HAVE
    return (
        <>
            {error && (`Houston, we have a problem! Tell the newbies that the ${error}`)}
            {isLoading && <LoadingScreenView/>}
            <div>&nbsp;</div>
            {hasSubmittedAnswer
                ? isAnswerCorrect
                    ? <CorrectResultBox/>
                    : <BadResultBox/>
                : null}
            {!isLoading && (
                <div>
                    <QuoteBox/>
                    <Question
                        onNextSet={nextSetACB}
                    />
                    <div>&nbsp;</div>
                    <HintView/>
                </div>
            )
            }
        </>
    );
}
export default GamePresenter;