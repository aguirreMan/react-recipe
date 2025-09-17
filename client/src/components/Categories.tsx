import CategoryCard from './CategoryCard'
//Image imports
import breakfastImage from '../assets/images/breakfast.jpg'
import lunchImage from '../assets/images/lunch.jpg'
import seafoodImage from '../assets/images/seafood.jpg'
import veganImage from '../assets/images/vegan.jpg'
import dinnerImage from '../assets/images/dinner.jpg'
import dessertsImage from '../assets/images/desserts.jpg'

interface Category {
  title: string,
  image: string
}

interface CategoryProps {
  onCategoryClicked: (categoryTitle: string) => void
}

export default function Categories({ onCategoryClicked }: CategoryProps) {
  const categories: Category[] = [
    { title: 'Breakfast', image: breakfastImage },
    { title: 'Lunch', image: lunchImage },
    { title: 'Seafood', image: seafoodImage },
    { title: 'Vegan', image: veganImage },
    { title: 'Dinner', image: dinnerImage },
    { title: 'Desserts', image: dessertsImage }
  ]
  function categoryCardClicked(categoryTitle: string) {
    onCategoryClicked(categoryTitle)
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 mt-18 justify-items-center gap-4'>
      {categories.map((category) => (
        <CategoryCard onClick={() => categoryCardClicked(category.title)}
          key={category.title}
          title={category.title}
          imageSrc={category.image}
          className='w-full' />
      ))}
    </div>
  )
}
