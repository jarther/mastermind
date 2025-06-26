import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { newanswer } from './utils.ts'
//https://handsonreact.com/docs/labs/ts/RunningYourProject

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App answer={newanswer()} />
  </StrictMode>,
)