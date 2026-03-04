import { ComplexSearchResponse } from './types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchRecipes(query: string, page: number = 1, isRandom: boolean = false, signal?: AbortSignal): Promise<ComplexSearchResponse> {
  const recipesPerPage = 12
  const offset = (page - 1) * recipesPerPage
  const baseUrl = `${API_URL}/complexSearch?query=${encodeURIComponent(query)}&number=${recipesPerPage}`
  const apiUrl = isRandom ? `${baseUrl}&random=true` : `${baseUrl}&offset=${offset}`

  const response = await fetch(apiUrl, { signal })
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }
  return response.json() as Promise<ComplexSearchResponse>
}
