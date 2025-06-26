import { answerLength, ColorOptions, letterToColor, range } from "../utils";

interface ColorSelectorProps {
    id: any;
    nextGuessHandler: any;
}

function ColorSelector(props: ColorSelectorProps) {
    const  {id, nextGuessHandler } = props;
    let myId = "colors" + id;
    //let boxSize = 7; // future: to display all the options, use `size={boxSize}` below
    let colorOptions: string[] = Array.from(Object.values(ColorOptions));
    return (
        <select name={myId} id={myId} onChange={(e) => nextGuessHandler(id, e.currentTarget.value)}>
            <option></option>
            {colorOptions.map((color) => <option value={color}>{letterToColor(color)}</option>)}
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