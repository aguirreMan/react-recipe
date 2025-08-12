import { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import './index.css'
import RecipesPage from './components/RecipesPage'

function App() {
  function handleSearch(query: string) {
    console.log('Searched this recipe')
  }
  return (
    <>
      <Header />
      <RecipesPage />
    </>
  )
}

export default App
