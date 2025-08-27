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
      <div className='min-h-screen bg-custom-background-color'>
        <Header onSearch={handleSearch} />
        <RecipesPage 
        searchQuery={query}
        onCategoryClick={handleCategoryClick} />
      </div>
    </>
  )
}

export default App
