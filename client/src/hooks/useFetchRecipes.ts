import { useState, useEffect } from 'react'
import { fetchRecipes } from '../api/fetchRecipes'
import { ComplexSearchResponse } from '../api/dummyData'

interface SpoonacularDataParams {
    query: string,
    page: number,
    random: boolean
}

export default function useFetchRecipes({ query, page, random }: SpoonacularDataParams) {
    const [recipes, setRecipes] = useState<ComplexSearchResponse | null>(null)

    useEffect(() => {
        if(!query && !random) return
        fetchRecipes(query, page, random)
        .then(response => setRecipes(response))
        .catch(() => setRecipes(null))
    }, [query, page, random])
    return recipes
}

/*function fetchDummyData(query: string, page: number = 1, random: boolean = false): Promise<ComplexSearchResponse> {
    //So now we need to access the dummy data here so we avoid an api call we can mimick return a promise to simulate 
    // An api call with data formatted from spoonacular 
    return new Promise((resolve) => {
        setTimeout(() => {
            const numberOfRecipes: number = 3
            const dummyOffset: number = (page - 1) * numberOfRecipes
            const filteredData = dummyRecipes.results.filter((recipeData) => {
                return recipeData.title.toLowerCase().includes(query.toLowerCase())
            })
            let dataToPaginate = filteredData
            if (random) {
                dataToPaginate = filteredData.sort(() => Math.random() - 0.5)
            }
            const paginatedData = dataToPaginate.slice(dummyOffset, dummyOffset + numberOfRecipes)
            const responseObject: ComplexSearchResponse = {
                results: paginatedData,
                offset: dummyOffset,
                number: paginatedData.length,
                totalResults: filteredData.length
            }
            resolve(responseObject)
        }, 1000)
    })
}

*/