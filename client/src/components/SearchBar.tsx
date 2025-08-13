import { useState, ChangeEvent } from 'react'

export interface SearchBarData {
    onSearch: (query: string) => void
}


export default function SearchBar({ onSearch }: SearchBarData) {
    const [query, setQuery] = useState<string>('')

    function handleInput(event: ChangeEvent<HTMLInputElement>) {
        const newQuery = event.target.value.toLowerCase()
        setQuery(newQuery)
        if (newQuery.length >= 3) {
            onSearch(newQuery)
        }  
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(query.length >= 3 ) onSearch(query)
    }


    return (
        <form onSubmit={handleSubmit}>
        <section className='flex justify-center flex-col items-center'>
            <label htmlFor='search-food' className='mb-2 text-3xl pt-8'>Search Food!</label>
            <div className='flex rounded-md overflow-hidden'>
                <input id='search-food' type='search' placeholder='tacos, pizza, chicken'
                    className='h-4 outline-0 border-0 text-2xl p-5 bg-white'
                    value={query}
                    onChange={handleInput}
                />
                <button type='submit' className='border-0 bg-emerald-600 text-amber-100 
                cursor-pointer outline-0 w-20'>Search</button>
            </div>
        </section>
        </form>
    )
}
