import React from 'react';
import {connect} from "react-redux";
import "./quotebox.css"
import {mapStateToQuoteBoxProps} from "../../features/game/gameMap";
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
// TODO What should go where and how? HintView or QuoteBox?
// TODO String interpolation

function QuoteBox(props) {
    function renderQuote(item, i){
        return <blockquote className="blockquote mb-0" key={i}>{item}</blockquote>
    }

    return (
        <>
            <Card>
                <Card.Header>Quote</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <div>
                        {props.lines.map(renderQuote)}
                        </div>
                        {props.characters
                            ? <footer style={{margin: 0}} className="blockquote-footer">We quoted <cite>{props.characters}</cite>.</footer>
                            : null}
                        {props.year
                            ? <footer style={{margin:0}} className ="blockquote-footer">The movie was made <cite>{props.year}</cite>.</footer>
                            : null}
                    </blockquote>
                </Card.Body>
            </Card>
            {(props.hints || props.characters || props.year)
                ? <Alert variant ={'warning'}>
                    <Alert.Heading>Darn! I forgot to tell you that every hint and quote cost you a point!</Alert.Heading>
                    <p>
                        {`You've ${props.hints !== 1 && "now "} lost  ${props.hints} ${props.hints === 1 ? "point" : "points"}`}
                    </p>
                    </Alert>
                : null }
        </>
    );
}
export default connect(mapStateToQuoteBoxProps)(QuoteBox)