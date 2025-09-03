import { useState } from 'react'
import { useParams, useLocation } from 'react-router'
import useFetchRecipeData from '../hooks/useFetchRecipeData'
import UnitToggle from './UnitToggle'

export default function SingleRecipePage() {
  const location = useLocation()
  const recipeObject = location.state?.recipe

  const { recipeId } = useParams() as { recipeId?: string }
  const { recipeData, loading, error } = useFetchRecipeData(recipeId)
  const [currentUnit, setCurrentUnit] = useState<'us' | 'metric'>('us')

  if (loading) return <div>..Loading</div>
  if (error) return <div>Error: {error}</div>
  if (!recipeData) return <div>No recipe found with this ID.</div>


  function toggleUnitSystem(newUnit: 'us' | 'metric') {
    setCurrentUnit(newUnit)
  }


  return (
    <div className='max-w-5xl mx-auto px-4'>
      <h1 className='text-center mt-6 text-3xl text-custom-header'>
        {recipeObject?.title}
      </h1>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
        <div>
          <img
            src={recipeObject?.image}
            alt={recipeObject?.title}
            className='object-cover rounded-lg w-full max-h-[350px]'
          />
        </div>
        <div className='flex flex-col items-start gap-4'>
          <span className='text-lg font-semibold'>
            {recipeData?.servings} servings
          </span>
          <span className='flex flex-row items-start gap-4'>
            <UnitToggle
              unit={currentUnit}
              onToggle={toggleUnitSystem}
            />
          </span>
          <div className='flex gap-2'>
            <button className='bg-amber-700 text-white rounded px-4 py-2 cursor-pointer'>+</button>
            <button className='bg-amber-700 text-white rounded px-4 py-2 cursor-pointer'>-</button>
            <button className='bg-gray-500 text-white rounded px-4 py-2 cursor-pointer'>Reset</button>
          </div>
        </div>
      </div>
      <div className='mt-10 grid grid-cols-1 md:grid-cols-1 gap-8'>
        <div>
          <h2 className='text-xl font-bold mb-2'>Ingredients</h2>
          <ul className='flex flex-col gap-1'>
            {recipeData.extendedIngredients.map(ingredient => (
              <li key={ingredient.name}>
                {currentUnit === 'metric' ? ingredient.formattedMeasures.metric : ingredient.formattedMeasures.us}
              </li>
            ))}
          </ul>
        </div>
        <div className='text-xl font-bold mb-2'>Instructions</div>
        {recipeData.instructions.map(step => (
          <p key={step.number}>
            Step {step.number}: {step.step}
          </p>
        ))}
      </div>
    </div>
  )
}