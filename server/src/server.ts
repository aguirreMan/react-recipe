//Basic imports
import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { saveRecipe, getRecipe } from './database/cache'
import { ComplexSearchResponse, SpoonacularInstruction, Recipe, Ingredient, FormattedMeasures } from './types/types'

dotenv.config()

const app: Application = express()
const port = parseInt(process.env.PORT || '3000', 10)

app.use(cors())
app.use(express.json())

const spoonacular_api_key = process.env.SPOONACULAR_API_KEY as string
//Route to call complex Search endpoint from Spoonacular
app.get('/complexSearch', async (req: Request, res: Response) => {
  //console.log('route was hit ')
  const query = req.query.query as string | undefined
  const number = parseInt(String(req.query.number), 10) || 60
  const offset = parseInt(String(req.query.offset), 10) || 0
  const random = req.query.random === 'true'

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' })
  }

  const encodedQuery = encodeURIComponent(query)
  let url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodedQuery}&number=${number}&apiKey=${spoonacular_api_key}`
  if (random) {
    url += '&sort=random'
  } else {
    url += `&offset=${offset}`
  }

  try {
    const response = await fetch(url)
    console.log('done fetching')
    console.log('status:', response.status)
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }
    const data: ComplexSearchResponse = await response.json()
    res.json(data)
  } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
        res.status(500).json({ error: 'Failed to fetch complex search results', details: error.message })
      }
    }
})

//Route logic for both the instructions endpoint and ingredients
app.get('/spoonacularInstructions/recipes/:id/instructions', async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  if (!id) {
    return res.status(400).json({ error: 'Missing recipe id' })
  }

  const cachedRecipe = getRecipe(id)
  if (cachedRecipe) {
    return res.json(cachedRecipe.recipe)
  }

//Fetching both endpoints ingredients, and instructions in parallel
  try {
    const instructionsEndPoint = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${spoonacular_api_key}`
    const ingredientsEndPoint = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacular_api_key}`
    const [instructionData, ingredientData] = await Promise.all([
      fetch(instructionsEndPoint),
      fetch(ingredientsEndPoint)
    ])

    if (!instructionData.ok || !ingredientData.ok) {
      return res.status(502).json({ error: 'Failed to fetch recipe data' })
    }
    const instructionInformation = await instructionData.json() as { steps: SpoonacularInstruction[] } []
    const ingredientInformation: Recipe = await ingredientData.json()

    if (!instructionInformation || instructionInformation.length === 0 || !instructionInformation[0].steps) {
      return res.status(404).json({ error: 'No instructions for this recipe' })
    }

    //Transforming the instruction data to return number , and the steps
    const steps: SpoonacularInstruction[] = instructionInformation[0].steps.map((step) => ({
      number: step.number,
      step: step.step
    }))

    if (!ingredientInformation || !ingredientInformation.extendedIngredients || ingredientInformation.extendedIngredients.length === 0) {
      return res.status(404).json({ error: 'No ingredients for this recipe' })
    }

    const recipeId = ingredientInformation.id
    const servings = ingredientInformation.servings

    //Function will format ingredients to return name original unit and give me back formatted
    function formatIngredients(ingredients: Ingredient[]) {
      return ingredients.map((ingredient) => {
        const measures: FormattedMeasures = formatMeasurements(ingredient)
        return {
          name: ingredient.name,
          nameClean: ingredient.nameClean,
          amount: ingredient.amount,
          original: ingredient.original,
          unit: ingredient.unit,
          measures: ingredient.measures,
          formattedMeasures: measures
        }
      })
    }
        //Function is formmating the measurements to return strings
    function formatMeasurements(ingredient: Ingredient): FormattedMeasures {
      const us = ingredient.measures?.us
      const metric = ingredient.measures?.metric
      return {
        us: us ? `${us.amount} ${us.unitShort}` : '',
        metric: metric ? `${metric.amount} ${metric.unitShort}` : ''
      }
    }

    const ingredientsArray = formatIngredients(ingredientInformation.extendedIngredients)

    const recipeCachedData = {
      id: ingredientInformation.id,
      title: ingredientInformation.title,
      image: ingredientInformation.image,
      imageType: ingredientInformation.imageType,
      servings,
      instructions: steps,
      extendedIngredients: ingredientsArray
    }

    saveRecipe(id, recipeCachedData)
    res.json(recipeCachedData)
  } catch (error) {
      console.error('error happening ')
      res.status(500).json({ error: 'server failed' })
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
