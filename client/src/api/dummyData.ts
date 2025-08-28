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


//These are the interface types for instructions and ingredient data

export interface SpoonacularInstructions {
  number: number,
  step: string
}
//This is the data for Ingredientds Data 

export interface SpoonacularIngredients {
  id: number,
  servings: number,
  extendedIngredients: ExtendedIngredients[]
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
  measures: Measures,
  formattedMeasures: FormattedMeasures
}

//This is the whole object we will get from spoonacular when fetching both ingredeints and instrucion data
export interface RecipeDetails extends SpoonacularResultsComplexSearch {
  instructions: SpoonacularInstructions[],
  servings: number,
  ingredients: SpoonacularIngredients
}

/* These recipes below were only used for development and testing mode they are not a part of the application
export const dummyRecipes: ComplexSearchResponse = {
  results: [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      image: "https://spoonacular.com/recipeImages/1-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 2,
      title: "Chicken Parmesan",
      image: "https://spoonacular.com/recipeImages/2-312x231.jpg",
      imageType: "jpg",
    },
    {
      id: 3,
      title: "Vegan Tacos",
      image: "https://spoonacular.com/recipeImages/3-312x231.jpg",
      imageType: "jpg",
    },
  ],
  offset: 0,
  number: 3,
  totalResults: 50,
}
  */