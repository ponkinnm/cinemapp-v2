import React from 'react';
import Question from "../pages/gameplay/Question";

function GamePresenter(props) {
    const hardQuote = "Say hello to my little friend";
    const movies = ["Die Hard", "Scarface", "Harry Potter and The Philosophers stone"]
    const movies2 = [
            {id: 1, title: "Die Hard"},
            {id: 2, title: "Scarface"},
            {id: 3, title: "Harry Potter and The Philosophers stone"},
    ]
    function checkAnswer(id){
        // props.model.xxxxx(id)
    }

    return (
        <div>
            <Question
                quote={hardQuote}
                onAnswer={checkAnswer}
                movies={movies}
            />
        </div>
    );
}

export default GamePresenter;