import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App'
import SingleRecipePage from './components/SingleRecipePage'
import RecipesPage from './components/RecipesPage'
import Header from './components/Header'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/recipes' element={<RecipesPage />} />
        <Route path='/recipes/:recipeId' element={<SingleRecipePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

