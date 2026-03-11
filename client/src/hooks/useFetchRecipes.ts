import { useState, useEffect } from 'react'
import { fetchRecipes } from '../utils/types/fetchRecipes'
import { SpoonacularResultsComplexSearch, FetchRecipesParams } from '../utils/types/types'

export function useFetchRecipes({ query, page, random }: FetchRecipesParams) {
  const [recipes, setRecipes] = useState<SpoonacularResultsComplexSearch[]>([])
  const [totalResults, setTotalResults] = useState(0)
   const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query && !random) return
    const controller = new AbortController()
    setIsLoading(true)

    fetchRecipes(query, page, random, controller.signal)
      .then(response => {
        setTotalResults(response.totalResults)
        setRecipes(prev => page === 1 ? response.results : [...prev, ...response.results])
    })
      .catch((error) => {
        if (error?.name === 'AbortError') return
        setRecipes([])
        setTotalResults(0)
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [query, page, random])
  return { recipes, totalResults, isLoading }
}
