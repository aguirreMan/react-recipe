import { useState, useEffect } from 'react'
import { ExtendedIngredients } from '../api/dummyData'

export default function useScaleServings(initialServings: number, initialIngredients: ExtendedIngredients[]) {
    const [servingsSize, setServingsSize] = useState(initialServings)
    const [scaleIngredients, setScaleIngredients] = useState(initialIngredients)

    function incrementServings() {
        setServingsSize(prev => prev + 1)
    }

    function decrementServings() {
        setServingsSize(prev => (prev > initialServings ? prev - 1 : initialServings))
    }

    function resetServings() {
        setServingsSize(initialServings)
    }

    useEffect(() => {
        if (!initialIngredients) return
        const scaleFormula = servingsSize / initialServings
        const newIngredientsArray = initialIngredients.map(newIngredient => {
            const scaledAmount = newIngredient.amount * scaleFormula
            return {
                ...newIngredient,
                amount: scaledAmount,
                formattedMeasures: {
                    us: `${scaledAmount} ${newIngredient.measures?.us.unitShort}`,
                    metric: `${scaledAmount} ${newIngredient.measures?.metric.unitShort}`
                }
            }
        })
        setScaleIngredients(newIngredientsArray)
    }, [servingsSize, initialServings, initialIngredients])

    return {
        servingsSize,
        scaleIngredients,
        incrementServings,
        decrementServings,
        resetServings
    }
}