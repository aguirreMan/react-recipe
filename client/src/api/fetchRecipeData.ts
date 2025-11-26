import { RecipeDetails } from './dummyData'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchRecipeData(recipeId: string): Promise<RecipeDetails> {
    if (!recipeId) {
        throw new Error('Failed Fetching Recipe ID')
    }
    //convert the recipeId string which is what i will use when working with useParams in 
    //React router to a number so the backend always returns a number and when working with 
    //router we have a string
    const numberId: number = parseInt(recipeId, 10)
    if (isNaN(numberId)) {
        console.error('recipe id is not a number')
    }
    const apiEndpoint: string = `${API_URL}/spoonacularInstructions/recipes/${recipeId}/instructions`
    const apiResponse = await fetch(apiEndpoint)
    if (!apiResponse.ok) {
        const errorData = await apiResponse.json()
        throw new Error(`server error: ${JSON.stringify(errorData)}`)
    }
    const recipeData = await apiResponse.json()
    return recipeData
}