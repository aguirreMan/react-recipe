import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import SearchBar from './SearchBar'
import Categories from './Categories'
import useFetchRecipes from '../hooks/useFetchRecipes'
import SpoonacularRecipes from './SpoonacularRecipes'
import { SpoonacularResultsComplexSearch, ComplexSearchResponse } from '../api/dummyData'
import LoadMoreRecipesButton from './LoadMoreRecipesButton'

export default function RecipesPage(){

    const navigator = useNavigate()
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [random, setRandom] = useState(false)


    const recipeData:ComplexSearchResponse | null = useFetchRecipes({ query, page, random })

    const [hasSearched, setSearched] = useState(false)
    const [recipes, setRecipes] = useState<SpoonacularResultsComplexSearch[]>([])
    const [totalResults, setTotalResults] = useState<number>(0)
    const [paginate, canPaginate] = useState(false)

    function navigateRecipes(recipe: SpoonacularResultsComplexSearch){
        navigator(`/recipes/${recipe.id}` , { state: { recipe }})
    }
// useeffect to decide if we do a search or category click
    useEffect(() => {
        if(!recipeData) {
            setRecipes([])
            setTotalResults(0)
            return
        }
        setTotalResults(recipeData.totalResults)
        setRecipes(prev => {
            if(page === 1){
                return recipeData.results
            } else {
                return [...prev, ...recipeData.results]
            }
        })
    }, [recipeData, page])

    useEffect(() => {
        if(!random && recipes.length > 0){
            canPaginate(recipes.length < totalResults)
        }
    }, [recipes, totalResults, random])

    function handleSearch(newQuery: string) {
        setQuery(newQuery)
        setPage(1)
        setRandom(false)
        setSearched(true)
    }

    function handlesCategoryClicks(categoryTitle: string){
        setQuery(categoryTitle)
        setPage(1)
        setRandom(true)
        setSearched(true)
    }

   
    function loadMoreRecipes(){
       setPage(prev => prev + 1)
    }
    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {!hasSearched ? (
                <div className='relative flex justify-center group pt-6'>
                    <span className='bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg'>
                        Browse or explore new Recipes!
                    </span>
                </div>
            ) : recipeData?.results.length === 0 ? (
                <p>No recipes found</p>
            ) : (
                <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {recipes.map(recipe => (
                            <SpoonacularRecipes 
                            key={recipe.id} 
                            title={recipe.title} 
                            image={recipe.image}
                            onRecipeClick={() => navigateRecipes(recipe)} />
                        ))}
                    </div>
                    <div className='flex justify-center'>
                    {!random && paginate && (
                        <LoadMoreRecipesButton onClick={loadMoreRecipes}>
                            Load More Recipes!
                        </LoadMoreRecipesButton>
                    )}
                    {random && recipes.length < 60 && (
                        <LoadMoreRecipesButton onClick={loadMoreRecipes}>
                            Load more Random Recipes!
                        </LoadMoreRecipesButton>
                    )}
                    </div>
                </div>
            )}
            <Categories onCategoryClicked={handlesCategoryClicks} />
        </div>
    )
}
