import { ComplexSearchResponse } from './dummyData'

export async function fetchRecipes(query: string, page: number = 1, isRandom: boolean= false): Promise<ComplexSearchResponse>{
    const complexSearch: string = 'http://localhost:3000/complexSearch'
    const recipesPerPage: number = 12
    const offset: number = (page -1) * recipesPerPage
    let apiUrl: string = `${complexSearch}?query=${query}&number=${recipesPerPage}`

    if(isRandom){
        apiUrl += `&random=true`
    } else {
        apiUrl += `&offset=${offset}`
    }
    const response = await fetch(apiUrl)
    if(!response.ok){
        alert('failed to fetch recipes')
        throw new Error('Failed to fetch recipes')
    }
    return response.json() as Promise<ComplexSearchResponse>
}
    