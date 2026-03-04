//The SpoonacularResultsComplexSearch is needed as well as the ComplexSearchResponse
export interface SpoonacularResultsComplexSearch {
  id: number
  title: string
  image: string
  imageType?: string
}

export interface ComplexSearchResponse {
  results: SpoonacularResultsComplexSearch[]
  offset: number
  number: number
  totalResults: number
}

export interface useFetchRecipesParams {
  query: string
  page: number
  random: boolean
}

//These are the interface types for instructions and ingredient data

export interface SpoonacularInstructions {
  number: number,
  step: string
}

export interface Measures {
  us: MeasureUnit,
  metric: MeasureUnit
}

export interface MeasureUnit {
  amount: number,
  unitShort: string,
  unitLong?: string
}

export interface FormattedMeasures {
  us: string,
  metric: string
}

export interface ExtendedIngredients {
  name: string,
  nameClean: string,
  original: string,
  amount: number,
  unit: string,
  measures?: Measures,
  formattedMeasures?: FormattedMeasures
}

//This is the whole object we will get from spoonacular when fetching both ingredeints and instrucion data
export interface RecipeDetails extends SpoonacularResultsComplexSearch {
  instructions: SpoonacularInstructions[],
  servings: number,
  extendedIngredients: ExtendedIngredients[]
}
