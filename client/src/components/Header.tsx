import logo from '../assets/images/logo.png'
import SearchBar, { SearchBarData } from './SearchBar'


export default function Header({ onSearch }: SearchBarData) {
    return (
        <header className='bg-custom-header shadow-sm sticky top-0 z-50 h-18 '>
            <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row 
           items-center justify-center md:justify-between py-4 space-y-4 md:space-y-0'>
                <h1 className='text-3xl font-bold text-custom-font-title'>
                    <span className='flex items-center gap-2'>
                        <img src={logo} alt='Recipe explorer logo' className='h-8 w-8' />
                        Recipe Explorer
                    </span>
                </h1>
                <div className='w-full md:w-auto'>
                    <SearchBar onSearch={onSearch} />
                </div>
            </div>
        </header>
    )
}