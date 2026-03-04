import { RecipeDetails } from './types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchRecipeData(recipeId: string, signal?: AbortSignal): Promise<RecipeDetails> {
  if (!recipeId) {
    throw new Error('Failed Fetching Recipe ID')
  }

  const numberId = parseInt(recipeId, 10)
  if (isNaN(numberId)) {
    throw new Error('Recipe id must be a number')
  }
  const apiEndpoint = `${API_URL}/spoonacularInstructions/recipes/${recipeId}/instructions`
  const apiResponse = await fetch(apiEndpoint, {signal})
  if (!apiResponse.ok) {
    const errorData:{ error: string } = await apiResponse.json()
    throw new Error(`server error: ${errorData.error}`)
  }
  const recipeData: RecipeDetails = await apiResponse.json()
  console.log(recipeData)
  return recipeData
}
