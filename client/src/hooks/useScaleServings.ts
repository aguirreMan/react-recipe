import { useState, useMemo } from 'react'
import { ExtendedIngredients } from '../api/dummyData'
import formatAmounts from '../api/formatAmounts'

export default function useScaleServings(
    initialServings: number,
    initialIngredients: ExtendedIngredients[]
) {
    console.log('recalculating ingredients')

    const validInitialServings = initialServings > 0 ? initialServings : 1

    const [servingsSize, setServingsSize] = useState(validInitialServings)

    //  DERIVED STATE  calculate directly, don't store in state
    const scaleIngredients = useMemo(() => {
        console.log(' useMemo recalculating ingredients')
        //const start = performance.now()

        if (!initialIngredients?.length || initialServings <= 0) {
            return initialIngredients || []
        }

        const scaleFormula = servingsSize / initialServings

        const result = initialIngredients.map(ingredient => {
            if (!ingredient.measures?.us?.amount || !ingredient.measures?.metric?.amount) {
                return ingredient
            }

            const scaledAmountUS = ingredient.measures.us.amount * scaleFormula
            const scaledAmountMetric = ingredient.measures.metric.amount * scaleFormula

            return {
                ...ingredient,
                measures: {
                    us: {
                        ...ingredient.measures.us,
                        amount: scaledAmountUS
                    },
                    metric: {
                        ...ingredient.measures.metric,
                        amount: scaledAmountMetric
                    }
                },
                formattedMeasures: {
                    us: `${formatAmounts(scaledAmountUS)} 
                    ${ingredient.measures.us.unitShort ||
                        ingredient.measures.us.unitLong}`,
                    metric: `${formatAmounts(scaledAmountMetric)} 
                    ${ingredient.measures.metric.unitShort ||
                        ingredient.measures.metric.unitLong}`
                }
            }
        })

        //const end = performance.now()
        //console.log(`⏱️ Calculation took ${(end - start).toFixed(2)}ms`)

        return result

    }, [servingsSize, initialServings, initialIngredients])
    // ☝️ Only recalculates when these ACTUALLY change

    function incrementServings() {
        setServingsSize(prev => prev + 1)
    }

    function decrementServings() {
        setServingsSize(prev => Math.max(prev - 1, validInitialServings))
    }

    function resetServings() {
        setServingsSize(validInitialServings)
    }

    return {
        servingsSize,
        scaleIngredients,
        incrementServings,
        decrementServings,
        resetServings
    }
}