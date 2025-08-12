import React from 'react'

interface CategoryCardData {
  title: string,
  imageSrc: string
}

export default function CategoryCard({title, imageSrc}) {
  return (
    <div className='bg-blue-50 text-white p-7 rounded-lg w-64 h-64'>
        <h2 className='text-xl text-center'>{title}</h2>
        <img src={imageSrc} className='pt-6 object-cover' />
    </div>
  )
}
