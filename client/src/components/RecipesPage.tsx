import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Categories from './Categories'
import useFetchRecipes from '../hooks/useFetchRecipes'
import SpoonacularRecipes from './SpoonacularRecipes'
import { SpoonacularResultsComplexSearch, ComplexSearchResponse } from '../api/dummyData'
import LoadMoreRecipesButton from './LoadMoreRecipesButton'

interface RecipePageData {
    searchQuery: string,
    onCategoryClick: (query: string) => void,
}

export default function RecipesPage({ searchQuery, onCategoryClick }: RecipePageData) {
    const navigator = useNavigate()

    const [page, setPage] = useState(1)
    const [random, setRandom] = useState(false)


    const recipeData: ComplexSearchResponse | null = useFetchRecipes({ query: searchQuery, page, random })


    const [hasSearched, setSearched] = useState(false)
    const [recipes, setRecipes] = useState<SpoonacularResultsComplexSearch[]>([])
    const [totalResults, setTotalResults] = useState<number>(0)
    const [paginate, canPaginate] = useState(false)
    const [recipesLoading, setRecipesLoading] = useState(false)

    //This is to hide categories at the bottom of the page 
    const [showCategories, setShowCategories] = useState(true)

    function navigateRecipes(recipe: SpoonacularResultsComplexSearch) {
        navigator(`/recipes/${recipe.id}`, { state: { recipe } })
    }
    // useeffect to decide if we do a search or category click
    useEffect(() => {
        if (!recipeData) {
            setRecipes([])
            setTotalResults(0)
            setRecipesLoading(false)
            return
        }
        setTotalResults(recipeData.totalResults)
        setRecipes(prev => page === 1 ? recipeData.results : [...prev, ...recipeData.results])
        setRecipesLoading(true)
    }, [recipeData, page])

    useEffect(() => {
        if (!random && recipes.length > 0) {
            canPaginate(recipes.length < totalResults)
        }
    }, [recipes, totalResults, random])

    useEffect(() => {
        if (searchQuery) {
            setSearched(true)
        }
    }, [searchQuery])


    function handlesCategoryClicks(categoryTitle: string) {
        onCategoryClick(categoryTitle)
        setPage(1)
        setRandom(true)
        setSearched(true)
    }

    function loadMoreRecipes() {
        setPage(prev => prev + 1)
    }

    function toggleCategories() {
        setShowCategories(prev => !prev)
    }

    return (
        <div>
            {!hasSearched ? (
                <div className='relative flex justify-center group pt-6'></div>
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
                    <div className='flex justify-center mt-4'>
                        {!random && recipesLoading && paginate && (
                            <LoadMoreRecipesButton onClick={loadMoreRecipes}>
                                Load More Recipes!
                            </LoadMoreRecipesButton>
                        )}
                        {random && recipesLoading && recipes.length < 60 && (
                            <LoadMoreRecipesButton onClick={loadMoreRecipes}>
                                Load more Random Recipes!
                            </LoadMoreRecipesButton>
                        )}
                    </div>
                    {recipesLoading && recipes.length > 0 && (
                        <div className='flex justify-center mt-4'>
                            <button className='flex items-center gap-2 px-6 rounded-full 
                            font-semibold shadow-md bg-custom-category-card-hover mt-4 mb-4'
                                onClick={toggleCategories} >
                                {showCategories ? 'hide categories' : 'show categories'}
                                <span className={`transform transition-transform ${showCategories ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            )}
            {showCategories && (
                <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6'>
                    <Categories
                        onCategoryClicked={handlesCategoryClicks}
                    />
                </div>
            )}

        </div>
    )
}