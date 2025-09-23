interface CategoryCardData {
  title: string,
  imageSrc: string,
  onClick?: () => void,
  className?: string
}

export default function CategoryCard({ title, imageSrc, onClick }: CategoryCardData) {
  return (
    <div className='bg-custom-category-card text-custom-card-titles p-7 shadow-md transition duration-200 
  hover:bg-custom-category-card-hover hover:text-custom-card-title-hover hover:shadow-lg hover:scale-105 
  cursor-pointer ml-8 rounded-lg w-36 h-auto'
      onClick={onClick}>
      <h2 className='text-xl text-center'>{title}</h2>
      <img src={imageSrc} className='pt-4 object-cover w-full rounded-lg' />
    </div>
  )
}