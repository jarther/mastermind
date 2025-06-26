import { maxGuesses, translateToColors, range } from "../utils";

function BuildRow({ guess = "", result = "" }) {
    let id = guess + result;
    return (
        <tr key={guess} id={id}><td key={guess}>{translateToColors(guess)}</td><td>{result}</td></tr>
    );
}

export interface GuessDisplayProps {
    guesses: string[];
    results: string[];
}

export function GuessDisplay(props: GuessDisplayProps) {
    const { guesses, results } = props;
    return (
        <table className="guessDisplay">
            <thead>
                <tr>
                    <th>Guess</th>
                    <th>Result</th>
                </tr></thead>
            <tbody>
                {range(maxGuesses).map((i) => <BuildRow guess={guesses[i]} result={results[i]} />)}
            </tbody>
        </table>
    )
}