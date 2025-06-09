import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

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
  const [nextGuess, setNextGuess] = useState('');
  const [gameStatus, setGameStatus] = useState("during");
  const [results, setResults] = useState(Array().fill(''));

  //todo: this assumes a letter can only appear once in the answer!!
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

  const handleClick = (e) => {
    const guessNumber = maxGuesses - remaining;
    const updatedGuesses = guesses.slice();
    updatedGuesses[guessNumber] = nextGuess.toUpperCase();
    setGuesses(updatedGuesses);
    checkResult(updatedGuesses[guessNumber]);
    console.log(results);
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
        <span>Colors available: R, G, B, Y, O, P</span>
        <span>.   Remaining guesses: {remaining}</span>
      </div>
      <div>
        <span>{guesses[0]} | result: {results[0]}</span><br />
        <span>{guesses[1]} | result: {results[1]}</span><br />
        <span>{guesses[2]} | result: {results[2]}</span><br />
        <span>{guesses[3]} | result: {results[3]}</span><br />
        <span>{guesses[4]} | result: {results[4]}</span><br />
        <span>{guesses[5]} | result: {results[5]}</span><br />
        <span>{guesses[6]} | result: {results[6]}</span><br />
        <span>{guesses[7]} | result: {results[7]}</span><br />
        <span>{guesses[8]} | result: {results[8]}</span><br />
        <span>{guesses[9]} | result: {results[9]}</span><br />
      </div>
      <br />
      <div className="UserInput">
        <input type="text" minLength={4} maxLength={4} onChange={(e) => setNextGuess(e.target.value)}></input>
        <button hidden={gameStatus != GameStatus.During} disabled={nextGuess.length < 4} onClick={(e) => handleClick(e)}>make my guess</button>
      </div>
    </>
  )
}

export default App