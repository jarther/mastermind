import { ColoredPeg } from "./ColoredPeg";

function BuildRow({guess = "", result = ""}) {
    // let translatedGuess = [];
    // for (let i=0; i<4; i++) {
    //     let c = guess.toUpperCase().charAt(i);
    //     translatedGuess.push(<ColoredPeg color={c} />);
    // }
    return (
        <tr key={guess}><td>{guess}</td><td>{result}</td></tr>
    );
}

export interface GuessDisplayProps {
    guesses: string[];
    results: string[];
}

export function GuessDisplay(props: GuessDisplayProps) {
    const { guesses, results} = props;
    const listItems = guesses.map(guess => <li key={guess}>{guess}</li>); //could use this to render dots
    return (
        <table className="guessDisplay">
            <thead>
                <tr>
                <th>Guess</th>
                <th>Result</th>
            </tr></thead>
            <tbody>
            <BuildRow guess={guesses[0]} result={results[0]} />
            <BuildRow guess={guesses[1]} result={results[1]} />
            <BuildRow guess={guesses[2]} result={results[2]} />
            <BuildRow guess={guesses[3]} result={results[3]} />
            <BuildRow guess={guesses[4]} result={results[4]} />
            <BuildRow guess={guesses[5]} result={results[5]} />
            <BuildRow guess={guesses[6]} result={results[6]} />
            <BuildRow guess={guesses[7]} result={results[7]} />
            <BuildRow guess={guesses[8]} result={results[8]} />
            <BuildRow guess={guesses[9]} result={results[9]} />
            </tbody>
        </table>
    )
}

/* TODO: might want to look into a grid instead of a table. But right now I should switch to fixing the input
also, bingos and almosts could be their own columns in the table maybe*/