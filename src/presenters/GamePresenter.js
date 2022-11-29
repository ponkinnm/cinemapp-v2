import React from 'react';
import Question from "../pages/gameplay/Question";

function GamePresenter(props) {
    const hardQuote = "Say hello to my little friend";
    const movies = ["Die Hard", "Scarface", "Harry Potter and The Philosophers stone"]
    function checkAnswer(id){
        // props.model.xxxxx(id)
    }

    return (
        <div>
            <Question
                quote={hardQuote}
                answer={checkAnswer}
                movies={movies}
            />
        </div>
    );
}

export default GamePresenter;