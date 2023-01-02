import React from 'react';
import {connect} from "react-redux";
import Alert from 'react-bootstrap/Alert';
import {mapStateToBadResultBoxProps} from "../../features/game/gameMap";

// TODO: Merge with the rest
function BadResultBox(props) {
    return (
        <Alert variant={'danger'}>
            You Lose! Good Day Sir!
            The right answer was {props.movie}.
        </Alert>
    );
}

export default connect(mapStateToBadResultBoxProps)(BadResultBox);
