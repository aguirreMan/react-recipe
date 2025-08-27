import React from 'react'


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
                <button onClick={onRecipeClick} className='mt-2 px-4 py-2 bg-custom-button text-custom-card-title-hover text-sm rounded-md hover:bg-custom-button-hover transition-colors cursor-pointer'>
                    View Recipe
                </button>

            </div>
        </div>
    )
}
