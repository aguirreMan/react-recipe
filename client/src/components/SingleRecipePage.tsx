import React from 'react'
//Import loader eventually
import { useParams } from 'react-router'
import useFetchRecipeData from '../hooks/useFetchRecipeData'


export default function SingleRecipePage() {
    const { recipeId } = useParams() as { recipeId?: string}
    const { recipeData, loading, error } = useFetchRecipeData(recipeId)
    console.log(recipeData)
    //console.log(recipeData?.title)
    if(loading) return <div>..Loading</div>
    if(error) return <div>Error: {error}</div>
    if(!recipeData) return <div>No recipe found with this ID.</div>



    return (
      <div>
        <h1>{recipeData?.title}</h1>
      </div>
  )
}
