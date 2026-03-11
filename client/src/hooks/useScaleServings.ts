import { useState, useMemo, useEffect } from 'react'
import { ExtendedIngredients } from '../utils/types/types'
import formatAmounts from '../utils/types/formatAmounts'

export default function useScaleServings(
  initialServings: number,
  initialIngredients: ExtendedIngredients[]
) {

  const [servingsSize, setServingsSize] = useState(() => initialServings)

  useEffect(() => {
    if (initialServings && initialServings > 0) {
      setServingsSize(initialServings)
    }
  },[initialServings])

    const scaleIngredients = useMemo(() => {
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
      return result

    }, [servingsSize, initialServings, initialIngredients])

    function incrementServings() {
      setServingsSize(prev => prev + 1)
    }

    function decrementServings() {
      setServingsSize(prev => Math.max(prev - 1, initialServings))
    }

    function resetServings() {
      setServingsSize(initialServings)
    }
    return {
      servingsSize,
      scaleIngredients,
      incrementServings,
      decrementServings,
      resetServings
    }
}
