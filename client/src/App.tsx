import React from 'react'
import { useState } from 'react'
import Header from './components/Header'
import './index.css'
import RecipesPage from './components/RecipesPage'

function App(){
  const [query, setQuery] = useState<string>('')

  function handleSearch(newQuery: string){
    setQuery(newQuery)
  } 

  function handleCategoryClick(categoryTitle: string){
    setQuery(categoryTitle)
  }

  return (
    <>
        <Header onSearch={handleSearch} />
        <RecipesPage 
        searchQuery={query}
        onCategoryClick={handleCategoryClick}
        />
    </>
  )
}

export default App
