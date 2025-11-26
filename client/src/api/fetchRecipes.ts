import { ComplexSearchResponse } from './dummyData'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchRecipes(query: string, page: number = 1, isRandom: boolean = false): Promise<ComplexSearchResponse> {
    const complexSearch: string = `${API_URL}/complexSearch`
    const recipesPerPage: number = 12
    const offset: number = (page - 1) * recipesPerPage
    let apiUrl: string = `${complexSearch}?query=${query}&number=${recipesPerPage}`

    if (isRandom) {
        apiUrl += `&random=true`
    } else {
        apiUrl += `&offset=${offset}`
    }
    const response = await fetch(apiUrl)
    if (!response.ok) {
        alert('failed to fetch recipes')
        throw new Error('Failed to fetch recipes')
    }
    return response.json() as Promise<ComplexSearchResponse>
}