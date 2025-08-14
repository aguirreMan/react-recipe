import React from 'react'
import { useState } from 'react'
import SearchBar from './SearchBar'
import Categories from './Categories'
import useFetchRecipes from '../hooks/useFetchRecipes'
import SpoonacularRecipes from './SpoonacularRecipes'

export default function RecipesPage() {
    //console.log('RecipesPage rendered')
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [random, setRandom] = useState(false)

    const recipeData = useFetchRecipes({ query, page, random })

    const [hasSearched, setSearched] = useState(false)

    function handleSearch(newQuery: string) {
        setQuery(newQuery)
        setPage(1)
        setRandom(false)
        setSearched(true)
    }

    function handlesCategoryClicks(categoryTitle: string) {
        console.log('this is clicked')
        setQuery(categoryTitle)
        setPage(1)
        setRandom(true)
        setSearched(true)
    }
    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {!hasSearched ? (
                <div className='relative flex justify-center group pt-6'>
                    <span className='bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg cursor-pointer'>
                        Search for your favorite foods!
                    </span>
                </div>
            ) : recipeData.results.length === 0 ? (
                <p>No recipes found</p>
            ) : (
                <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {recipeData.results.map(recipe => (
                            <SpoonacularRecipes key={recipe.id} title={recipe.title} image={recipe.image} />
                        ))}
                    </div>
                </div>
            )}
            <Categories onCategoryClicked={handlesCategoryClicks} />
        </div>
    )

}
