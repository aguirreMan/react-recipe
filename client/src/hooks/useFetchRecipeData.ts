import { useState, useEffect } from 'react'
import { RecipeDetails } from '../api/dummyData'
import { fetchRecipeData } from '../api/fetchRecipeData'

export default function useFetchRecipeData(recipeId: string | undefined) {
    const [recipeData, setRecipeData] = useState<RecipeDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        setRecipeData(null)

        if (recipeId) {
            fetchRecipeData(recipeId)
                .then((data) => setRecipeData(data))
                .catch((err) => {
                    console.error(err)
                    setError('something went wrong fetching the data')
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }

    }, [recipeId])
    return { recipeData, loading, error }
}
