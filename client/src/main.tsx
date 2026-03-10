import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App'
import SingleRecipePage from './components/SingleRecipePage'
import RecipesPage from './components/RecipesPage'
import NotFound from './components/NotFound'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<RecipesPage />} />
          <Route path='recipes' element={<RecipesPage />} />
          <Route path='recipes/:recipeId' element={<SingleRecipePage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
