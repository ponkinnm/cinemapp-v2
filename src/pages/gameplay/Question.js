import React from 'react';
import './quotebox.css';

function Question({quote, movies}) {
    function alternativeCB(movie) {
        return (<div>
                <input type="radio"
                       id={movie}
                       value={movie}
                       name={"answer"}
                       key={movie}
                />
                <label htmlFor={movie}>{movie}</label>
            </div>);
    }

    function handleAnswerACB(){
        //const input = document.querySelectorAll('input');
    }

    return (<div>
            {quote}
            <form>
                <fieldset>
                    <legend>Which movie?</legend>
                    {movies.map(alternativeCB)}
                    <button onClick={handleAnswerACB} type={"submit"}>Submit</button>
                </fieldset>
            </form>
        </div>);
}

export default Question;