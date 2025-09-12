import { useState, useEffect } from 'react'
import { ExtendedIngredients } from '../api/dummyData'
import formatAmounts from '../api/formatAmounts'

export default function useScaleServings(initialServings: number, initialIngredients: ExtendedIngredients[]) {
    const [servingsSize, setServingsSize] = useState(initialServings)
    const [scaleIngredients, setScaleIngredients] = useState(initialIngredients)
    //increment spoonaculars default servings returned by the api
    function incrementServings() {
        setServingsSize(prev => prev + 1)
    }
    //decrement spoonaculars default servings we only wont allow to decrement below inital servings from spoonacular
    function decrementServings() {
        setServingsSize(prev => (prev > initialServings ? prev - 1 : initialServings))
    }

    function resetServings() {
        setServingsSize(initialServings)
    }

    useEffect(() => {
        if (!initialIngredients) return
        if (initialServings > 0 && servingsSize === 0) {
            setServingsSize(initialServings)
        }
        const scaleFormula = servingsSize / initialServings
        const newIngredientsArray = initialIngredients.map(newIngredient => {

            if (newIngredient.measures?.us.amount && newIngredient.measures?.metric.amount) {
                const scaledAmountUS = newIngredient.measures?.us?.amount * scaleFormula
                const scaledAmountMetric = newIngredient.measures?.metric?.amount * scaleFormula
                return {
                    ...newIngredient,
                    amount: scaledAmountUS,
                    measures: {
                        us: {
                            ...newIngredient.measures.us,
                            amount: scaledAmountUS
                        },
                        metric: {
                            ...newIngredient.measures.metric,
                            amount: scaledAmountMetric
                        }
                    },
                    formattedMeasures: {
                        us: `${formatAmounts(scaledAmountUS)} ${newIngredient.measures?.us.unitShort || newIngredient.measures?.us.unitLong}`,
                        metric: `${formatAmounts(scaledAmountMetric)} ${newIngredient.measures?.metric.unitShort || newIngredient.measures?.metric.unitLong}`
                    }
                }
            }
            return newIngredient
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