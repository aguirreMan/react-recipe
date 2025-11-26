//This component is all about going back to the previous state single recipe page will 
//do the logic 

export interface GoBackButton {
    onClick: () => void
}

export default function GoBackArrow({ onClick }: GoBackButton) {
    return (
        <button onClick={onClick} className='fixed top-24 left-6 px-4 py-2 bg-custom-button
             hover:bg-custom-button-hover rounded-2xl cursor-pointer text-white z-50 sm: mt-10'>
            Go back
        </button>
    )
}