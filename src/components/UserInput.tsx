import { ColoredPeg } from './ColoredPeg';

interface ColorSelectorProps {
    id: any;
    nextGuessHandler: any;
}

function ColorSelector(props: ColorSelectorProps) {
    const  {id, nextGuessHandler } = props;
    let myId = "colors" + id;

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

// the behavior I'd expect is either
// (no state at all option) : empty selector is the default, on change it updates next guess, on submit it clears the selectors
// (state here): on button click, it submits the state of the selectors together
export function UserInput(props: UserInputProps) {
    const { clickHandler, nextGuessHandler } = props;
    
    return (
        <div className="UserInput">
            <ColorSelector id={0} nextGuessHandler={nextGuessHandler}/>
            <ColorSelector id={1} nextGuessHandler={nextGuessHandler}/>
            <ColorSelector id={2} nextGuessHandler={nextGuessHandler}/>
            <ColorSelector id={3} nextGuessHandler={nextGuessHandler}/>
            <button onClick={(e) => clickHandler()}>make my guess</button>
        </div>
    );
}