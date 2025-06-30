
export const answerLength = 4;
export const maxGuesses = 10;

export function range(n: number) {
    return Array.from(Array(n).keys()).map(i => i);
}

export const ColorOptions = {
    red: "R",
    green: "G",
    blue: "B",
    yellow: "Y",
    orange: "O",
    purple: "P",
} as const;

export function letterToColor(color: string) {
    switch (color) {
        case ColorOptions.red:
            return "🔴";
        case ColorOptions.green:
            return "🟢";
        case ColorOptions.blue:
            return "🔵";
        case ColorOptions.yellow:
            return "🟡";
        case ColorOptions.orange:
            return "🟠";
        case ColorOptions.purple:
            return "🟣";
        default:
            return " ";
    };
}

export function translateToColors(guess: string) {
    let translation = "";
    if (guess && guess.length == answerLength) {
        for (let i = 0; i < answerLength; i++) {
            let nextLetter: string = guess.charAt(i);
            let nextColor = letterToColor(nextLetter);
            translation += nextColor;
        }
    }
    return translation;
}

export function newanswer(): string{
  let generatedAnswer = "";
  const optionsAsArray = Object.values(ColorOptions);
  for (let i = 0; i < answerLength; i++) {
    const index = Math.floor(optionsAsArray.length * Math.random());
    generatedAnswer += optionsAsArray[index];
  }
  return generatedAnswer;
}

export const GameStatus = {
  During: "during",
  Win: "win",
  Loss: "loss",
} as const;