import { useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router'
import useFetchRecipeData from '../hooks/useFetchRecipeData'
import useScaleServings from '../hooks/useScaleServings'
import Loading from './Loading'
import UnitToggle from './UnitToggle'
import GoBackArrow from './GoBackArrow'
import LoadMoreInstructionsButton from './LoadMoreInstructionsButton'
import { SpoonacularInstructions } from '../utils/types/types'

export default function SingleRecipePage() {
  const { recipeId } = useParams<{ recipeId: string }>()
  const { recipeData, loading, error } = useFetchRecipeData(recipeId)
  //const location = useLocation()
  //const recipeObject = location.state?.recipe
  const [currentUnit, setCurrentUnit] = useState<'us' | 'metric'>('us')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const querySearched = searchParams.get('query') || ''
  const pageNumber = searchParams.get('page') || '1'
  const ifCategory = searchParams.get('isCategory') || ''

  const [instructionsToggle, setInstructionToggle] = useState<boolean>(false)

  const { servingsSize, scaleIngredients, incrementServings, decrementServings, resetServings } =
    useScaleServings(recipeData?.servings || 0, recipeData?.extendedIngredients || [])

  if (loading) return <Loading message='fetching recipe' />
  if (error) return <div>Error: {error}</div>
  if (!recipeData) return <div>No recipe found with this ID.</div>

  const recipeToRender = recipeData

  function toggleUnitSystem(newUnit: 'us' | 'metric') {
    setCurrentUnit(newUnit)
  }

  function toggleInstructions() {
    setInstructionToggle(prev => !prev)
  }

  function handleGoBack() {
    navigate(`/recipes?query=${querySearched}&page=${pageNumber}&isCategory=${ifCategory}`)
  }

  function toggleRestofInstructions(instructionSteps: SpoonacularInstructions[], isToggled: boolean) {
    if (!instructionSteps?.length) return []
    const defaultNumberOfStepsToRender = 4
    if (isToggled) return instructionSteps
    return instructionSteps.slice(0, defaultNumberOfStepsToRender)
  }

  function calculateInstructionDifference(totalSteps: number) {
    const defaultNumberOfStepsToRender = 4
    if (totalSteps <= defaultNumberOfStepsToRender) return 0
   return totalSteps - defaultNumberOfStepsToRender
  }

  const instructionsToDisplay = toggleRestofInstructions(recipeData.instructions, instructionsToggle)

  return (
    <div className='relative max-w-5xl mx-auto px-4 pt-16'>
      <GoBackArrow onClick={handleGoBack} />

      <div className='flex justify-between items-center mt-6'>
        <h1 className='text-center mt-6 text-3xl text-custom-header'>{recipeToRender.title}</h1>
        <UnitToggle unit={currentUnit} onToggle={toggleUnitSystem} />
      </div>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
        <div className='flex justify-center'>
          <img
            src={recipeToRender.image}
            alt={recipeToRender.title}
            className='object-cover rounded-lg max-w-[400px] max-h-[400px]'
          />
        </div>

        <div className='flex flex-col gap-6 items-center'>
          <span className='text-lg font-semibold'>{servingsSize} servings</span>
          <div className='flex gap-2'>
            <button onClick={incrementServings} className='bg-custom-button text-white rounded px-4 py-2 cursor-pointer'>
              +
            </button>
            <button onClick={decrementServings} className='bg-custom-button text-white rounded px-4 py-2 cursor-pointer'>
              -
            </button>
            <button onClick={resetServings} className='bg-custom-button-reset text-white rounded px-4 py-2 cursor-pointer'>
              Reset
            </button>
          </div>
        </div>
        {/*Ingredients section */}
        <div>
          <h2 className='text-xl text-custom-header font-bold mb-2'>Ingredients</h2>
          <ul className='flex flex-col gap-1'>
            {scaleIngredients.map((ingredient, index) => (
              <li key={index}>
                {currentUnit === 'us'
                  ? ingredient.formattedMeasures?.us || ingredient.original
                  : ingredient.formattedMeasures?.metric || ingredient.original}{' '}
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Instructions Section  */}
      <div className='my-12 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent' />
      <div className='mt-10 mb-10'>
        <h2 className='text-custom-header text-xl font-bold mb-2'>Instructions</h2>
        {instructionsToDisplay?.map(step => (
          <p key={step.number} className='m-4 p-2'>
            Step {step.number}: {step.step}
          </p>
        ))}

        {recipeData.instructions?.length > 4 && (
          <div className='pt-2 flex justify-center'>
            <LoadMoreInstructionsButton
              isInstructionsToggled={instructionsToggle}
              instructionSteps={calculateInstructionDifference(recipeData?.instructions.length)}
              onInstructionToggle={toggleInstructions}
            />
          </div>
        )}
      </div>
    </div>
  )
}
