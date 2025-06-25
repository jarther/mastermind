//import { createElement, type JSXElementConstructor } from 'react';
import { ColoredPeg } from './ColoredPeg';
import { answerLength, range } from "../utils";

interface ColorSelectorProps {
    id: any;
    nextGuessHandler: any;
}

function ColorSelector(props: ColorSelectorProps) {
    const  {id, nextGuessHandler } = props;
    let myId = "colors" + id;
    //let boxSize = 7; // future: to display all the options, use `size={boxSize}` below

    return (
        <select name={myId} id={myId} onChange={(e) => nextGuessHandler(id, e.currentTarget.value)}>
            <option></option>
            <option value="R">🔴</option>
            <option value="G">🟢</option>
            <option value="B">🔵</option>
            <option value="Y">🟡</option>
            <option value="O">🟠</option>
            <option value="P"><ColoredPeg color='P'/></option>
        </select>
    );
}

export interface UserInputProps {
    clickHandler: any;
    nextGuessHandler: any;
}

export function UserInput(props: UserInputProps) {
    const { clickHandler, nextGuessHandler } = props;
    return (
        <div className="UserInput">
            {range(answerLength).map((i) =><ColorSelector id={i} nextGuessHandler={nextGuessHandler}/>)}
            <button onClick={(e) => clickHandler()}>make my guess</button>
        </div>
    );
}