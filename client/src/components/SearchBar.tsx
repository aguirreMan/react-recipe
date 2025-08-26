import { useState, ChangeEvent } from 'react'

export interface SearchBarData {
    onSearch: (query: string) => void
}


export default function SearchBar({ onSearch }: SearchBarData) {
    const [query, setQuery] = useState<string>('')

    function handleInput(event: ChangeEvent<HTMLInputElement>) {
        const newQuery = event.target.value.toLowerCase()
        setQuery(newQuery)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(query.length >= 3 ) onSearch(query)
    }


    return (
        <form onSubmit={handleSubmit} className='w-full'>
        <section className='flex justify-center flex-col items-center w-full px-4'>
            <div className='flex rounded-md overflow-hidden '>
                <input id='search-food' type='search' placeholder='tacos, pizza, chicken'
                    className='h-4 outline-0 border-0 text-2xl p-5 bg-custom-searchbar hover:bg-custom-searchbar-hover flex-1 min-w-0'
                    value={query}
                    onChange={handleInput}
                />
                <button type='submit' className='border-0 bg-custom-button text-amber-100 
                cursor-pointer outline-0 w-20 hover:bg-custom-button-hover transition-colors'>Search</button>
            </div>
        </section>
        </form>
    )
}
