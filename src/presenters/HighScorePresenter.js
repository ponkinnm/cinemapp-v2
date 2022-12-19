import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {ref, onValue} from 'firebase/database'
import {database} from "../firebaseConfig";
import {useSelector} from "react-redux";
import {selectUser} from "../features/auth/authSlice";

const mapStateToProps = (state) => {
    return {
        score: state.game.score,
        totalScore: state.game.totalScore
    }
}

function HighScorePresenter() {
    const user = useSelector(selectUser);
    const [dbRef, setDbRef] = useState(null);
    const [highscores, setHighscores] = useState([]);

    useEffect(() => {
        if (user) {
            setDbRef(ref(database, `users/${user.uid}/highScore`))
        }
    }, [user])

    useEffect(() => {
        getHighScoreFromDb();
    }, [dbRef])

    //Getter for highScore from logged in user
    async function getHighScoreFromDb() {
        if (dbRef) {
            onValue(dbRef, (response) => {
                if (response.exists()) {
                    setHighscores([...new Set(Object.values(response.val()))].sort((a, b) => b - a).slice(0, 6));
                }
            })
        }
    }

    function highscoreListCB(highscore, index) {
        return <li key={highscore}>{`#${index + 1}: ${highscore}`}</li>
    }

    return (
        <div>
            <h1>Your High scores</h1>
            {highscores.length ?
                <ul className="p-1 list-unstyled d-flex flex-column justify-content-center text-center">
                    {highscores.map(highscoreListCB)}
                </ul> : null}
        </div>
    )

}

export default connect(mapStateToProps)(HighScorePresenter)
