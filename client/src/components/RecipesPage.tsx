import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import Categories from './Categories'
import { useFetchRecipes } from '../hooks/useFetchRecipes'
import SpoonacularRecipes from './SpoonacularRecipes'
import Loading from './Loading'
import { SpoonacularResultsComplexSearch } from '../utils/types/types'
import Button from './Button'

export default function RecipesPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // URL-driven state
  const searchQuery = searchParams.get('query') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)
  const isRandom = searchParams.get('isCategory') === 'true'

  const [showCategories, setShowCategories] = useState(true)
  const hasSearched = searchQuery.length > 3

  const { recipes, totalResults, isLoading } = useFetchRecipes({
    query: searchQuery,
    page,
    random: isRandom
    })

  // Navigate to single recipe
  function navigateRecipes(recipe: SpoonacularResultsComplexSearch) {
    navigate(
      `/recipes/${recipe.id}?query=${encodeURIComponent(searchQuery)}&page=${page}&isCategory=${isRandom}`,
      { state: { recipe } }
    )
  }

  function handleCategoryClick(categoryTitle: string) {
    navigate(`/recipes?query=${encodeURIComponent(categoryTitle)}&page=1&isCategory=true`)
  }

  function loadMoreRecipes() {
    navigate(`/recipes?query=${encodeURIComponent(searchQuery)}&page=${page + 1}&isCategory=${isRandom}`)
  }

  function toggleCategories() {
    setShowCategories(prev => !prev)
  }

  if (isLoading && page === 1) {
    return <Loading />
  }

  const canPaginate = isRandom ? recipes.length < 60 : recipes.length < totalResults
  return (
    <div>
      {!hasSearched ? (
        <div className='relative flex justify-center group pt-6'></div>
      ) : isLoading && page === 1 ? (
        <Loading message={`preparing your ${searchQuery} recipes`} />
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
          {/* Pagination buttons */}
          <div className='flex justify-center mt-4'>
            {!isLoading && canPaginate && (
              <Button onClick={loadMoreRecipes} disabled={isLoading}>
                {isRandom ? 'Load more Random Recipes!' : 'Load more recipes!'}
              </Button>
            )}
          </div>
          {/* Toggle category cards */}
          {recipes.length > 0 && (
            <div className='flex justify-center mt-4'>
              <Button
                className='rounded-full font-semibold shadow-md bg-custom-category-card-hover mt-4 mb-4'
                onClick={toggleCategories}
              >
                {showCategories ? 'hide categories' : 'show categories'}
                <span className={`transform transition-transform ${showCategories ? 'rotate-180' : ''}`}>▼</span>
              </Button>
            </div>
          )}
        </div>
      )}
      {/* Category cards */}
      {showCategories && (
        <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6 pb-4'>
          <Categories onCategoryClicked={handleCategoryClick} />
        </div>
      )}
    </div>
  )
}
