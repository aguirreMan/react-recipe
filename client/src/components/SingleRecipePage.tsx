import React from 'react'
//Import loader eventually
import { useParams } from 'react-router'
import useFetchRecipeData from '../hooks/useFetchRecipeData'

interface recipeParams {
  [key: string]: string | undefined
}

export default function SingleRecipePage() {
    const { id } = useParams<recipeParams>()
    const { recipeData, loading, error } = useFetchRecipeData(id)
    if(loading) return <div>..Loading</div>
    if(error) return <div>Error: {error}</div>
    if(!recipeData) return <div>No recipe found with this ID.</div>

    return (
      <div>
        <h1>{recipeData?.title}</h1>
      </div>
  )
}
