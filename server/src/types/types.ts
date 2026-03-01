//ComplexSearch interfaces
interface SpoonacularResultsComplexSearch {
  id: number,
  title: string,
  image: string,
  imageType?: string
}
//Response from Complex Search
export interface ComplexSearchResponse {
  results: SpoonacularResultsComplexSearch[],
  offset: number,
  number: number,
  totalResults: number
}

//Instruction interfaces
export interface SpoonacularInstruction {
  number: number,
  step: string
}

//Ingredients interfaces
export interface Recipe {
  id: number
  title: string
  image: string
  imageType?: string
  servings: number
  extendedIngredients: Ingredient[]
  instructions: SpoonacularInstruction[]
}
//Raw extendedIngredients data from spoonacular
export interface Ingredient {
  name: string,
  nameClean: string,
  original: string,
  amount: number,
  unit: string,
  measures: Measures,
  formattedMeasures: FormattedMeasures
}
//This is from Spoonacular raw response this gets modified in the function formatMeasurements
interface Measures {
  us: MeasureUnit,
  metric: MeasureUnit
}

interface MeasureUnit {
  amount: number,
  unitShort: string,
  unitLong?: string
}
//This is the formatted Measurments i made in the formatMeasurements function this is not returned
//by spoonacular
export interface FormattedMeasures {
  us: string,
  metric: string
}
