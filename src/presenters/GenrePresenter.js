import GenrePickerView from "../views/GenrePickerView.js";
import React, {useState} from 'react'
import {GENRE} from "../util/filmConsts.js";
import {useGetMovieIdsByGenreQuery} from "../features/api/apiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {gameSliceAction} from "../features/game/gameSlice";
import {useDispatch} from "react-redux";
import LoadingScreenView from "../views/LoadingScreenView";
import GamePresenter from "./GamePresenter";

// TODO CreateAction, extraReducers? Stream line
let isInitial = true // Find a better solution
export default function GenrePresenter() {
    const LIMIT = 100
    const [myGenre, setMyGenre] = useState(skipToken)
    const dispatch = useDispatch()

    // alt 1
    function handleGenreChange(selectedGenre) {
        setMyGenre({
            limit: LIMIT,
            genre: selectedGenre,
        })
    }

    const {
        data,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetMovieIdsByGenreQuery(myGenre)

    if (data && isInitial) {
        // TODO: fixed the problem with suboptimal solution (isInitial). Is there a better solution?
        dispatch(gameSliceAction.resetGame())
        dispatch(gameSliceAction.replaceListOfMovieIds(data))
        isInitial = false
    }

    // TODO: create an error component?  Like LoadingScreen...
    return (
        <>
            {isError
                ? <div>{`Houston, we have a problem! Tell the newbies that the ${error.message.toString()}`}</div>
                : (isLoading || isFetching)
                    ? <LoadingScreenView/>
                    : data && isSuccess
                        ? <GamePresenter/>
                        : <GenrePickerView
                            setGenre={handleGenreChange}
                            genres={GENRE}
                        />
            }
        </>
    );
}