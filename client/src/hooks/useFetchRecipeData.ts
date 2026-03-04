import { useState, useEffect } from 'react'
import { RecipeDetails } from '../utils/types/types'
import { fetchRecipeData } from '../utils/types/fetchRecipeData'

export default function useFetchRecipeData(recipeId: string | undefined) {
  const [recipeData, setRecipeData] = useState<RecipeDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setRecipeData(null)

    if (!recipeId) {
      setLoading(false)
      return
    }

    const controller = new AbortController()

    fetchRecipeData(recipeId, controller.signal)
      .then((data) => {
        setRecipeData(data)
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return
        setError('something went wrong fetching this recipe')
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
      return () => controller.abort()
  }, [recipeId])
  return { recipeData, loading, error }
}
