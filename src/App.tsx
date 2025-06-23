import { useState } from 'react'
import './App.css'
import { GuessDisplay } from './components/GuessDisplay';
import { ColoredPeg } from './components/ColoredPeg';
import { UserInput } from './components/UserInput';

//may want to move this into like a utils thing... 
const GameStatus = {
  During: "during",
  Win: "win",
  Loss: "loss",
} as const;

function App({ answer = "" }) {
  console.log(answer)
  const maxGuesses = 10;
  const [remaining, setRemaining] = useState(maxGuesses);
  const [guesses, setGuesses] = useState(Array().fill(''));
  const [nextGuess, setNextGuess] = useState(Array().fill('R'));
  const [gameStatus, setGameStatus] = useState("during");
  const [results, setResults] = useState(Array().fill(''));

  const checkResult = (guess: string) => {
    if (guess == answer) {
      setGameStatus(GameStatus.Win);
    }
    let bingos = 0;
    let almosts = 0;
    let guessArray: string[] = [...guess];
    let answerArray: string[] = [...answer];
    for (let ind = 0; ind < 4; ind++) {
      if (guessArray[ind] == answerArray[ind]) {
        bingos++;
        guessArray[ind] = " ";
        answerArray[ind] = "-";
      }
    }
    for (let index = 0; index < 4; index++) {
      const foundIndex = answerArray.indexOf(guessArray[index]);
      if (foundIndex > -1) {
        almosts++;
        guessArray[index] = " ";
        answerArray[foundIndex] = '-';
      }
      const newResults = results.slice();
      newResults.push("bingos: " + bingos + " almosts: " + almosts);
      setResults(newResults);
    }
  };

  const updateNextGuess = (index: number, letter: string) => {
        const updatedInProgressGuess = nextGuess.slice();
        updatedInProgressGuess[index] = letter;
        setNextGuess(updatedInProgressGuess);
        console.log("Letter: " + letter + " index: " + index + " In progress guess:" + updatedInProgressGuess)
    };

  const handleClick = (e) => {
    const guessNumber = maxGuesses - remaining;
    const updatedGuesses = guesses.slice();
    const newGuess = "" + nextGuess[0] + nextGuess[1] + nextGuess[2] + nextGuess[3];
    updatedGuesses[guessNumber] = newGuess;
    setGuesses(updatedGuesses);
    checkResult(updatedGuesses[guessNumber]);
    setRemaining((remaining) => remaining - 1);
    if (remaining == 1 && gameStatus != GameStatus.Win) {
      setGameStatus(GameStatus.Loss);
    }
  };

  return (
    <>
      <h1>Mastermind</h1>
      <h2 hidden={gameStatus != GameStatus.Win}>You won! Refresh the page to play again.</h2>
      <h2 hidden={gameStatus != GameStatus.Loss}>You lost. Refresh the page to play again</h2>
      <h4 hidden={gameStatus != GameStatus.During}>Info: "bingo" means the right color in the right spot. "almost" is the right color in the wrong spot.</h4>
      <div className="card">
        <span>Colors available: R, G, B, Y, O, P </span>
        <ColoredPeg color={"R"}/><ColoredPeg color={"G"}/><ColoredPeg color={"B"}/><ColoredPeg color={"Y"}/><ColoredPeg color={"O"}/>
        <ColoredPeg color={"P"}/>
        <span>.   Remaining guesses: {remaining}</span>
      </div>
      <GuessDisplay guesses={guesses} results={results} />
      <br />
      <UserInput gameStatus={gameStatus} nextGuess={nextGuess} nextGuessHandler={updateNextGuess} clickHandler={handleClick} />
    </>
  )
}

export default App