import { useState } from 'react'
import './App.css'
import { GuessDisplay } from './components/GuessDisplay';
import { UserInput } from './components/UserInput';
import { translateToColors, GameStatus, answerLength, maxGuesses } from './utils';

function App({answer = ""}) {
  console.log(answer);
  const [remaining, setRemaining] = useState(maxGuesses);
  const [guesses, setGuesses] = useState(Array().fill(''));
  const [nextGuess, setNextGuess] = useState(Array().fill('R'));
  const [gameStatus, setGameStatus] = useState("during");
  const [results, setResults] = useState(Array().fill('', 0, maxGuesses - 1));

  const updateNextGuess = (index: number, letter: string) => {
    const updatedInProgressGuess = nextGuess.slice();
    updatedInProgressGuess[index] = letter;
    setNextGuess(updatedInProgressGuess);
  };

  const handleClick = () => {
    const guessNumber = maxGuesses - remaining;
    setRemaining((remaining) => remaining - 1);

    const updatedGuesses = guesses.slice();
    const newGuess = nextGuess.join("");
    updatedGuesses[guessNumber] = newGuess;
    setGuesses(updatedGuesses);

    checkResult(updatedGuesses[guessNumber]);
    
    if (remaining == 1 && gameStatus != GameStatus.Win) {
      setGameStatus(GameStatus.Loss);
    }
  };

  const checkResult = (guess: string) => {
    if (guess === answer) {
      setGameStatus(GameStatus.Win);
    }
    let bingos = 0;
    let almosts = 0;
    let guessArray: string[] = [...guess];
    let answerArray: string[] = [...answer];
    
    // check for exact matches
    for (let ind = 0; ind < answerLength; ind++) {
      if (guessArray[ind] === answerArray[ind]) {
        bingos++;
        guessArray[ind] = " ";
        answerArray[ind] = "-";
      }
    }

    //exact matches are out of the way, now check for partial matches
    for (let index = 0; index < answerLength; index++) {
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

  return (
    <>
      <h1>Mastermind</h1>
      <div className="message">
        <h2 hidden={gameStatus != GameStatus.Win}>You won! Refresh the page to play again.</h2>
        <h2 hidden={gameStatus != GameStatus.Loss}>You lost. The answer was {translateToColors(answer)} Refresh the page to play again.</h2>
        <h3 hidden={gameStatus != GameStatus.During}>Info: "bingo" means the right color in the right spot. "almost" is the right color in the wrong spot.</h3>
      </div>
      <div className="guessCount">
        <h3>Remaining guesses: {remaining}</h3>
      </div>
      <GuessDisplay guesses={guesses} results={results} />
      <br />
      <div hidden={gameStatus != GameStatus.During}>
        <UserInput clickHandler={handleClick} nextGuessHandler={updateNextGuess} />
      </div>
    </>
  )
}

export default App