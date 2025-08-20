import React from 'react'

interface ButtonProps {
  onClick: () => void,
  children: React.ReactNode,
  disabled?: boolean
}

export default function LoadMoreRecipesButton({ onClick, children, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick}
      className={`bg-emerald-800 px-4 py-2 rounded-3xl border-none shadow cursor-pointer border-2 
        text-center mt-6
        ${disabled ? 'bg-gray-400' : 'hover:bg-green-600 text-4xl'}`}>
          {children}
        </button>
  )
}
