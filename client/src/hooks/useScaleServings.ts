import { useState } from 'react'

export default function useScaleServings(initialServings: number) {
    const [servingsSize, setServingsSize] = useState(initialServings)

    function incrementServings() {
        setServingsSize(prev => prev + 1)
    }

    function decrementServings() {
        setServingsSize(prev => (prev > initialServings ? prev - 1 : initialServings))
    }

    function resetServings() {
        setServingsSize(initialServings)
    }
    return {
        servingsSize,
        incrementServings,
        decrementServings,
        resetServings
    }
}
