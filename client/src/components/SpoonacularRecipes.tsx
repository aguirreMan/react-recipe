import Button from './Button'

interface SpoonacularCard {
  title: string,
  image: string,
  onRecipeClick: () => void
}

export default function SpoonacularRecipes({ image, title, onRecipeClick }: SpoonacularCard) {
  return (
    <div className='bg-custom-header gap-2 p-4 mt-6 overflow-hidden flex flex-col rounded-2xl cursor-pointer'>
      <img src={image} alt={title} className='object-cover w-full h-48' />
        <div className='p-4 flex flex-col flex-1'>
          <h2 className='text-lg font-semibold text-custom-card-titles mb-2'>{title}</h2>
            <Button onClick={onRecipeClick} className='mt-2 text-custom-card-title-hover text-sm transition-colors'>
              View Recipe
            </Button>
        </div>
    </div>
  )
}
