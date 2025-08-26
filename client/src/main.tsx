import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App'
import SingleRecipePage from './components/SingleRecipePage'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/recipes/:recipeId' element={<SingleRecipePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

