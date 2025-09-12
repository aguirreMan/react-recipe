import { useState } from 'react'
import { useParams, useLocation } from 'react-router'
import useFetchRecipeData from '../hooks/useFetchRecipeData'
import useScaleServings from '../hooks/useScaleServings'
import UnitToggle from './UnitToggle'

export default function SingleRecipePage() {
  const location = useLocation()
  const recipeObject = location.state?.recipe

  const { recipeId } = useParams() as { recipeId?: string }
  const { recipeData, loading, error } = useFetchRecipeData(recipeId)
  const [currentUnit, setCurrentUnit] = useState<'us' | 'metric'>('us')

  const { servingsSize, scaleIngredients, incrementServings, decrementServings, resetServings } = useScaleServings(recipeData?.servings || 0, recipeData?.extendedIngredients || [])
  //console.log(recipeData?.servings)

  if (loading) return <div>..Loading</div>
  if (error) return <div>Error: {error}</div>
  if (!recipeData) return <div>No recipe found with this ID.</div>

  //console.log(recipeData?.servings)

  function toggleUnitSystem(newUnit: 'us' | 'metric') {
    setCurrentUnit(newUnit)
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-center mt-6 text-3xl text-custom-font-title">
        {recipeObject?.title}
      </h1>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
        <div className='flex justify-center'>
          <img
            src={recipeObject?.image}
            alt={recipeObject?.title}
            className="object-cover rounded-lg max-w-[400px] max-h-[400px]" />
        </div>
        <div className="flex flex-col gap-6">
          <span className="text-lg font-semibold">
            {servingsSize} servings
          </span>

          <UnitToggle unit={currentUnit} onToggle={toggleUnitSystem} />

          <div className="flex gap-2">
            <button onClick={incrementServings} className='bg-amber-700 text-white rounded px-4 py-2 cursor-pointer'>+</button>
            <button onClick={decrementServings} className='bg-amber-700 text-white rounded px-4 py-2 cursor-pointer'>-</button>
            <button onClick={resetServings} className='bg-gray-500 text-white rounded px-4 py-2 cursor-pointer'>Reset</button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Ingredients</h2>
          <ul className="flex flex-col gap-1">
            {scaleIngredients.map((ingredient, index) => (
              <li key={index}>
                {currentUnit === 'us'
                  ? ingredient.formattedMeasures?.metric
                  : ingredient.formattedMeasures?.us || ingredient.original}{' '}
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructions (full width below grid) */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Instructions</h2>
        {recipeData.instructions.map((step) => (
          <p key={step.number}>
            Step {step.number}: {step.step}
          </p>
        ))}
      </div>
    </div>
  )
}