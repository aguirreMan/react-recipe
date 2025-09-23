import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import Categories from './Categories'
import useFetchRecipes from '../hooks/useFetchRecipes'
import SpoonacularRecipes from './SpoonacularRecipes'
import LoadMoreRecipesButton from './LoadMoreRecipesButton'
import { SpoonacularResultsComplexSearch, ComplexSearchResponse } from '../api/dummyData'

export default function RecipesPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // URL-driven state
    const searchQuery = searchParams.get('query') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const isRandom = searchParams.get('isCategory') === 'true'

    const [recipes, setRecipes] = useState<SpoonacularResultsComplexSearch[]>([])
    const [totalResults, setTotalResults] = useState<number>(0)
    const [recipesLoading, setRecipesLoading] = useState(false)
    const [paginate, setPaginate] = useState(false)
    const [showCategories, setShowCategories] = useState(true)
    const [hasSearched, setHasSearched] = useState(false)

    // Fetch recipes based on URL params
    const recipeData: ComplexSearchResponse | null = useFetchRecipes({
        query: searchQuery,
        page,
        random: isRandom,
    })

    // Update recipes when fetch completes
    useEffect(() => {
        if (!recipeData) {
            setRecipes([])
            setTotalResults(0)
            setRecipesLoading(false)
            return
        }

        setTotalResults(recipeData.totalResults)
        setRecipes(prev => (page === 1 ? recipeData.results : [...prev, ...recipeData.results]))
        setRecipesLoading(true)
    }, [recipeData, page])

    // Determine if we can paginate
    useEffect(() => {
        if (!isRandom && recipes.length > 0) {
            setPaginate(recipes.length < totalResults)
        }
    }, [recipes, totalResults, isRandom])

    // Track if a search has been made
    useEffect(() => {
        setHasSearched(searchQuery.length > 0)
    }, [searchQuery])

    // Navigate to single recipe
    function navigateRecipes(recipe: SpoonacularResultsComplexSearch) {
        navigate(
            `/recipes/${recipe.id}?query=${encodeURIComponent(searchQuery)}&page=${page}&isCategory=${isRandom}`,
            { state: { recipe } }
        )
    }

    // Handle category clicks
    function handleCategoryClick(categoryTitle: string) {
        navigate(`/recipes?query=${encodeURIComponent(categoryTitle)}&page=1&isCategory=true`)
    }

    // Load more recipes (increment page in URL)
    function loadMoreRecipes() {
        navigate(`/recipes?query=${encodeURIComponent(searchQuery)}&page=${page + 1}&isCategory=${isRandom}`)
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
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6'>
                        {recipes.map(recipe => (
                            <SpoonacularRecipes
                                key={recipe.id}
                                title={recipe.title}
                                image={recipe.image}
                                onRecipeClick={() => navigateRecipes(recipe)}
                            />
                        ))}
                    </div>

                    <div className='flex justify-center mt-4'>
                        {!isRandom && recipesLoading && paginate && (
                            <LoadMoreRecipesButton onClick={loadMoreRecipes}>Load More Recipes!</LoadMoreRecipesButton>
                        )}
                        {isRandom && recipesLoading && recipes.length < 60 && (
                            <LoadMoreRecipesButton onClick={loadMoreRecipes}>Load more Random Recipes!</LoadMoreRecipesButton>
                        )}
                    </div>

                    {recipesLoading && recipes.length > 0 && (
                        <div className='flex justify-center mt-4'>
                            <button
                                className='flex items-center gap-2 px-6 rounded-full font-semibold shadow-md bg-custom-category-card-hover mt-4 mb-4'
                                onClick={toggleCategories}
                            >
                                {showCategories ? 'hide categories' : 'show categories'}
                                <span className={`transform transition-transform ${showCategories ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showCategories && (
                <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6'>
                    <Categories onCategoryClicked={handleCategoryClick} />
                </div>
            )}
        </div>
    )
}
