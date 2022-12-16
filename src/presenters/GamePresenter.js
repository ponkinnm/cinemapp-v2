/**
 * filename         ../src/presenters/GamePresenter.js
 * @fileoverview    TODO (to write)
 */
import React, {useState} from 'react';
import Question from "../pages/gameplay/Question";
import {fetchAllMoviesQ, fetchArrayOfTitleIdsByGenre} from "../util/movieSource";
import {createMovieQuoteGenerator, createGame} from "../util/utilities";
import {QUOTE, QUOTE2, QUOTE3} from "../util/filmConsts";
import QuoteBox from "../pages/gameplay/QuoteBox";
import {CorrectResultBox, BadResultBox} from "../pages/gameplay/ResultBox";
import LoadingScreen from '../views/LoadingScreen'
import HintView from "../pages/gameplay/HintView"

function GamePresenter(props) {
    const [answerId, setAnswerId] = React.useState({})
    const [hasSubmittedAnswer, setHasSubmittedAnswer] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    // const [player, setPlayer] = React.useState(null)
    const [game, setGame] = React.useState(null)
    const [movieOptions, setMovieOptions] = React.useState([])
    const [movieQuoteGenerator, setMovieQuoteGenerator] = React.useState(null)

    const [correctMovieId, setCorrectMovieId] = React.useState("") // or just use movieQuoteGenerator.getId()
    const [showCharacter, setShowCharacter] = React.useState(false)
    const [showYear, setShowYear] = React.useState(false)
    const [isAnswerCorrect, setIsAnswerCorrect] = React.useState(false)
    const gameSetUp = React.useCallback(async () => {
        //     /*
        //      * fetch a list of Genre,
        //      * ask which genre the user wants to play with
        //      * fetch list of movies
        //      * choose three of them per game (random?)
        //      * fetch quoteObjects
        //      * create QuoteGenerators
        //      */

        setIsLoading(true)
        setError(null)
        setAnswerId("")
        setHasSubmittedAnswer(false)

        // get player id and stuff from Firebase?
        const firstGame = createGame()

        try {
            // get list per genre and add to game
            //const list = await fetchArrayOfTitleIdsByGenre(props.genre) // TODO comment out when list from genre menu is done
            firstGame.addToMovieList(...props.genre) // TODO Replace (...list) with list "prop" from genre menu

            // pick a chosen amount of film objects for the game. 3 is default
              //  API Calls
            //const titleIds = firstGame.getArrayOfRandomMovies(3) // magic number, hardcoded
            //const movieData = await fetchAllMoviesQ(...titleIds)
            // // Test Constants
            const movieData = [QUOTE, QUOTE2, QUOTE3].map(createMovieQuoteGenerator)

            // Randomly pick the movie to quote
            const randomIndex = Math.floor(Math.random() * movieData.length)
            const quoteMovie = movieData[randomIndex]

            // Create closure function
            // const quoteGenerator= createQuoteGeneratorStatic(quoteMovie)

            // set the states;
            setMovieOptions(movieData)
            setGame({...firstGame})
            // setMovieQuoteGenerator(quoteGenerator)
            setMovieQuoteGenerator(quoteMovie)
            setCorrectMovieId(quoteMovie.id)
        } catch (err){
            console.error(err)
            setError(err.message)
            newGame(200);
        }
        setIsLoading(false)
    }, [])

    React.useEffect(() =>{
        console.log("Effect running game set up ")
        setIsLoading(true)
        setError(null)

        gameSetUp();
        return () => {console.log("Effect clean up game set up")}
    }, [gameSetUp])


    function checkAnswerCB(id) {return id === correctMovieId} // or just use movieQuoteGenerator.getId() instead of correctMovieId
    function selectedAnswerACB(id) {
        setAnswerId(id)

    }
    function nextQuoteACB(){
        // movieQuoteGenerator.popQuote()
        game.addHints(1)

        setMovieQuoteGenerator( movieQuoteGenerator => createMovieQuoteGenerator(movieQuoteGenerator))
        // setMovieQuoteGenerator( {movieQuoteGenerator})
        setGame({...game}) // is this necessary?

        setShowCharacter(false)
    }
    function characterACB(toggle) {
        if(toggle) game.addHints(1)
        setGame({...game})

        setShowCharacter(toggle)
    }
    function yearACB(toggle) {
        if(toggle)game.addHints(1)
        setGame({...game})
        setShowYear(toggle)
    }

    function submitAnswerACB(id) {
        setAnswerId(id);
        console.log(id);
        console.log(correctMovieId);
        setHasSubmittedAnswer(true)
        setIsAnswerCorrect(checkAnswerCB(id))
        console.log(isAnswerCorrect)
        if (checkAnswerCB(id)) {
            game.addPoints(10)
        }
        // game.resetHintTracker()
        setGame({...game})
        setShowCharacter(false)
        setShowYear(false)
        newGame()
    }
    function newGame(delay = 5000) {
        setTimeout(gameSetUp, delay)
    }


    return (
        <>
            {error && (`Houston, we have a problem! Tell the newbies that the ${error}`)}
            {isLoading && <LoadingScreen/>}
            <div>&nbsp;</div>
            {hasSubmittedAnswer && isAnswerCorrect &&(
                <CorrectResultBox
                    isAnswerCorrect = {isAnswerCorrect}
                    score={game.getScore()}
                    hints={game.getHints()}
                />
            )}
            {hasSubmittedAnswer && !isAnswerCorrect &&(
                <BadResultBox
                    isAnswerCorrect = {isAnswerCorrect}
                    movie={movieQuoteGenerator.title}
                />
            )}
            {!isLoading && movieOptions && movieQuoteGenerator && (
                <div>
                <QuoteBox
                    movieToQuote = {movieQuoteGenerator}
                />
                <Question
                    onSubmit={submitAnswerACB}
                    onNext={nextQuoteACB}
                    onSelect={selectedAnswerACB}
                    movies={movieOptions}
                    hasSubmittedAnswer={hasSubmittedAnswer}
                    hasSelected={answerId}
                />
                <div>&nbsp;</div>
                <HintView
                    movieToQuote = {movieQuoteGenerator}
                    isHintCharacter = {showCharacter}
                    isHintYear = {showYear}
                    setHintCharacter={characterACB}
                    setHintYear={yearACB}
                />
                </div>
                )
            }

        </>
    );
}

export default GamePresenter;
