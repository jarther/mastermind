import { useState } from 'react'
import './App.css'
import { GuessDisplay, translateToColors } from './components/GuessDisplay';
import { UserInput } from './components/UserInput';

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

  const [nextGuess, setNextGuess] = useState(Array().fill('R'));
  const updateNextGuess = (index: number, letter: string) => {
    const updatedInProgressGuess = nextGuess.slice();
    updatedInProgressGuess[index] = letter;
    setNextGuess(updatedInProgressGuess);
  };

  const handleClick = () => {
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
      <div className="message">
        <h2 hidden={gameStatus != GameStatus.Win}>You won! Refresh the page to play again.</h2>
        <h2 hidden={gameStatus != GameStatus.Loss}>You lost. The answer was {translateToColors(answer)} Refresh the page to play again.</h2>
        <h4 hidden={gameStatus != GameStatus.During}>Info: "bingo" means the right color in the right spot. "almost" is the right color in the wrong spot.</h4>
      </div>
      <div className="guessCount">
        <h3>Remaining guesses: {remaining}</h3>
      </div>
      <GuessDisplay guesses={guesses} results={results} />
      <br />
      <div hidden={gameStatus != "during"}>
        <UserInput clickHandler={handleClick} nextGuessHandler={updateNextGuess} />
      </div>
    </>
  )
}

export default App