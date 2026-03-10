import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`bg-custom-button hover:bg-custom-button-hover px-4 py-2
      rounded-2xl cursor-pointer text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
