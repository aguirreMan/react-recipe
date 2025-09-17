//This component is just for the loading more instructions steps just a button

export interface InstructionsButton {
    isInstructionsToggled: boolean,
    instructionSteps: number,
    onInstructionToggle: () => void
}

export default function LoadMoreInstructionsButton({ isInstructionsToggled, instructionSteps, onInstructionToggle }: InstructionsButton) {
    return (
        <div className='mb-6'>
            <button onClick={onInstructionToggle} className='bg-custom-button px-4 py-2 rounded-2xl'>See full instructions List</button>
            {isInstructionsToggled ? 'Hide Instructions' : `Show ${instructionSteps} more steps`}
        </div>
    )
}