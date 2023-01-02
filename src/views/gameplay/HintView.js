import React, {} from 'react';
import {Button, Stack} from 'react-bootstrap';
import {connect} from "react-redux";
import {mapDispatchToHintViewProps, mapStateToHintViewProps} from "../../features/game/gameMap";

// TODO move connect to a presenter or merge with the rest of the gameplay views

function HintView(props){

    return <div>
    <Stack direction="vertical" gap={2}>
        <Button
            variant="secondary"
            disabled={props.year}
            onClick={props.onYear}>
            Hint for year
        </Button>
        <Button
            variant="secondary"
            disabled={props.characters}
            onClick={props.onCharacter}>
            Hint for characters
        </Button>
    </Stack>
    </div>
}
export default connect(mapStateToHintViewProps, mapDispatchToHintViewProps)(HintView)