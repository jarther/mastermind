interface ColorSelectorProps {
    id: any;
    nextGuessHandler: any;
}

function ColorSelector(props: ColorSelectorProps) {
    const  {id, nextGuessHandler } = props;
    let myId = "colors" + id;

    //maybe make a select handler function in here so I can tell what's going on?
    //or just debug
    return (
        <select name={myId} id={myId} onChange={(e) => nextGuessHandler(id, e.currentTarget.value)}>
            <option value="R">Red</option>
            <option value="G">Green</option>
            <option value="B">Blue</option>
            <option value="Y">Yellow</option>
            <option value="O">Orange</option>
            <option value="P">Purple</option>
        </select>
    );
}

export interface UserInputProps {
    gameStatus: string;
    nextGuess: string[];
    nextGuessHandler: any;
    clickHandler: any;
}

//ugh do I need the state managed in App but the update managed in here? maybe
export function UserInput(props: UserInputProps) {
    const { gameStatus, nextGuess, nextGuessHandler, clickHandler } = props;

    return (
        <div className="UserInput">
            <ColorSelector id={0} nextGuessHandler={nextGuessHandler}/>
            <ColorSelector id={1} nextGuessHandler={nextGuessHandler}/>
            <ColorSelector id={2} nextGuessHandler={nextGuessHandler}/>
            <ColorSelector id={3} nextGuessHandler={nextGuessHandler}/>
            <button hidden={gameStatus != "during"} onClick={(e) => clickHandler(e)}>make my guess</button>
        </div>
    );
}