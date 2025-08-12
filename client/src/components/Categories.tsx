import React from 'react'
import CategoryCard from './CategoryCard'
const images = import.meta.glob('../assets/*.{png,jpg,jpeg}',{eager: true})

export default function Categories(){
    const categories = [
        {title: 'desserts'}
    ]



  return (
    <div>CategoryCards</div>
  )
}
