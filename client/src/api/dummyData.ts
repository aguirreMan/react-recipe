//Using Dummy Data to simulate a real api call eventually when ready for production use 
//Spoonaculars fake data 

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
/* Wont use these since i am working on production mode today
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