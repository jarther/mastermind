import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
//https://handsonreact.com/docs/labs/ts/RunningYourProject

function newanswer(){
  const options = Array("R", "G", "B", "Y", "O", "P");
  let generatedAnswer = "";
  for(let i = 0; i < 4; i++) {
    const index = Math.floor(6*Math.random());
    generatedAnswer += options[index];
  }
  return generatedAnswer;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App answer={newanswer()}/>
  </StrictMode>,
)
