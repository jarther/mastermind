import { answerLength, ColorOptions, letterToColor, range } from "../utils";

interface ColorSelectorProps {
    id: any;
    nextGuessHandler: any;
}

function ColorSelector(props: ColorSelectorProps) {
    const  {id, nextGuessHandler } = props;
    let myId = "colors" + id;
    //let boxSize = 7; // future: to display all the options, use `size={boxSize}` below
    //let colorOptions = 
    return (
        <select name={myId} id={myId} onChange={(e) => nextGuessHandler(id, e.currentTarget.value)}>
            <option></option>
            <option value={ColorOptions.red}>{letterToColor(ColorOptions.red)}</option>
            <option value={ColorOptions.green}>{letterToColor(ColorOptions.green)}</option>
            <option value={ColorOptions.blue}>{letterToColor(ColorOptions.blue)}</option>
            <option value={ColorOptions.yellow}>{letterToColor(ColorOptions.yellow)}</option>
            <option value={ColorOptions.orange}>{letterToColor(ColorOptions.orange)}</option>
            <option value={ColorOptions.purple}>{letterToColor(ColorOptions.purple)}</option>
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