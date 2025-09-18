import { useState } from 'react'
import { useParams, useLocation } from 'react-router'
import useFetchRecipeData from '../hooks/useFetchRecipeData'
import useScaleServings from '../hooks/useScaleServings'
import UnitToggle from './UnitToggle'
import LoadMoreInstructionsButton from './LoadMoreInstructionsButton'
import { SpoonacularInstructions } from '../api/dummyData'

export default function SingleRecipePage() {
  const location = useLocation()
  const recipeObject = location.state?.recipe

  const { recipeId } = useParams() as { recipeId?: string }
  const { recipeData, loading, error } = useFetchRecipeData(recipeId)
  //current unit is for the unit toggle
  const [currentUnit, setCurrentUnit] = useState<'us' | 'metric'>('us')
  //console.log(recipeData)

  // This is for toggling instructions

  const [instructionsToggle, setInstructionToggle] = useState<boolean>(false)

  const { servingsSize, scaleIngredients, incrementServings, decrementServings, resetServings } = useScaleServings(recipeData?.servings || 0, recipeData?.extendedIngredients || [])


  if (loading) return <div>..Loading</div>
  if (error) return <div>Error: {error}</div>
  if (!recipeData) return <div>No recipe found with this ID.</div>

  function toggleUnitSystem(newUnit: 'us' | 'metric') {
    setCurrentUnit(newUnit)
  }

  function toggleInstructions() {
    setInstructionToggle(prev => !prev)
  }
  console.log(recipeData?.instructions)

  function toggleRestofInstructions(instructionSteps: SpoonacularInstructions[], isToggled: boolean) {
    if (!instructionSteps || instructionSteps.length === 0) return []
    const numberOfSteps = instructionSteps.length

    if (numberOfSteps <= 5) return instructionSteps

    if (numberOfSteps === 6) {
      return isToggled ? instructionSteps : instructionSteps.slice(0, 4)
    }
    if (numberOfSteps >= 7) {
      return isToggled ? instructionSteps : instructionSteps.slice(0, 5)
    }
  }

  function calculateInstructionDifference(totalSteps: number, isToggled: boolean) {
    if (totalSteps <= 5) return 0
    if (isToggled) return 0
    if (totalSteps === 6) return totalSteps - 4
    if (totalSteps >= 7) return totalSteps - 5
    return 0
  }

  const instructionsToDisplay = toggleRestofInstructions(recipeData.instructions, instructionsToggle)
  console.log(instructionsToDisplay)
  return (
    <div className='max-w-5xl mx-auto px-4'>
      <div className='flex justify-between items-center mt-6'>
        <h1 className='text-center mt-6 text-3xl text-custom-header'>
          {recipeObject?.title}
        </h1>
        <UnitToggle unit={currentUnit} onToggle={toggleUnitSystem} />
      </div>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
        <div className='flex justify-center'>
          <img
            src={recipeObject?.image}
            alt={recipeObject?.title}
            className='object-cover rounded-lg max-w-[400px] max-h-[400px]' />
        </div>
        <div className='flex flex-col gap-6 items-center'>
          <span className='text-lg font-semibold'>
            {servingsSize} servings
          </span>

          <div className='flex gap-2'>
            <button onClick={incrementServings} className='bg-custom-button text-white rounded px-4 py-2 cursor-pointer'>+</button>
            <button onClick={decrementServings} className='bg-custom-button text-white rounded px-4 py-2 cursor-pointer'>-</button>
            <button onClick={resetServings} className='bg-custom-button-reset text-white rounded px-4 py-2 cursor-pointer'>Reset</button>
          </div>
        </div>
        <div>
          <h2 className='text-xl text-custom-header font-bold mb-2'>Ingredients</h2>
          <ul className='flex flex-col gap-1'>
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

      <div className='mt-10 mb-10'>
        <h2 className='text-custom-header text-xl font-bold mb-2'>Instructions</h2>
        {instructionsToDisplay?.map((step) => (
          <p className='m-4 p-2' key={step.number}>
            Step {step.number}: {step.step}
          </p>
        ))}
        {recipeData?.instructions.length > 5 && (
          <div className='pt-2 flex justify-center'>
            <LoadMoreInstructionsButton
              isInstructionsToggled={instructionsToggle}
              instructionSteps={calculateInstructionDifference(recipeData?.instructions.length, instructionsToggle)}
              onInstructionToggle={toggleInstructions} />
          </div>
        )}
      </div>
    </div>
  )
}