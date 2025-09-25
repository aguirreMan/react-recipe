import BurgerLoader from '../assets/images/BurgerLoader.png'

interface loaderMessage {
    message?: string
}

export default function Loading({ message = 'loading' }: loaderMessage) {
    return (
        <div className='flex flex-col items-center justify-center min-h-[60vh]'>
            <img
                src={BurgerLoader}
                alt='Loading your recipe'
                className='w-20 h-20 animate-spin'
            />
            <p className='mt-4 text-lg font-medium text-custom-font-title'>{message}</p>
        </div>
    )
}