import { useState, useEffect } from 'react'
import { RecipeDetails } from '../api/dummyData'
import { fetchRecipeData } from '../api/fetchRecipeData'

export default function useFetchRecipeData(recipeId: string) {
    const [recipeData, setRecipeData] = useState<RecipeDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const data = await fetchRecipeData(recipeId)
        setRecipeData(data)
    }, [recipeId])
}
