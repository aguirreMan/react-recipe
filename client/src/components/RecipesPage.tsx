import React from 'react'
import { useState } from 'react'
import SearchBar from './SearchBar'
import useFetchRecipes from '../hooks/useFetchRecipes'

export default function RecipesPage() {


    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [random, setRandom] = useState(false)

    const recipeData = useFetchRecipes({ query, page, random })

    function handleSearch(newQuery: string) {
        setQuery(newQuery)
        setPage(1)
        setRandom(false)
    }

    {/*function handlesCategoryClicks(){
        setQuery(categoryQuery)
        setPage(1)
        setRandom(true)
    }   
    */}
    console.log('recipe data', recipeData)
     return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {recipeData.results.length === 0 ? (
                <p>No recipe found</p>
            ) : (
                recipeData.results.map((recipe: any) => (
                    <div key={recipe.id} className='recipe-card p-4 border rounded mb-3'>
                        <h3 className='text-xl font-black'>{recipe.title}</h3>
                    </div>
                ))
            )}
        </div>
    )
}
