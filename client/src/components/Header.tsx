import React from 'react'
import logo from '../assets/images/logo.png'

export default function Header() {
    return (
        <header className='px-8 py-4 flex items-center justify-center md:justify-start '>
            <h1 className='text-4xl font-bold text-red-900 w-full text-center md:text-left'>
                <span className='flex justify-center md:justify-start items-center gap-4 pt-6'>
                    <img src={logo} alt="Tasty Foods logo" className=' h-8 w-8' />
                    Tasty Foods</span>
            </h1>
        </header>
    )
}
