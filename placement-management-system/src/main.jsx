import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// const div =  <div>
// <h1>Welome To Chalapathi</h1>    
// <p>Learn Today, Lead Tomorrow</p>
// </div>

createRoot(document.getElementById('root')).render(
  //safety to components
  //enables to detect change in url and notify to react
  <BrowserRouter>

    <App />
  </BrowserRouter>
)
