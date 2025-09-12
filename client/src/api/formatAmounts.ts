//This function is only for formatting decimals to make them more readable

export default function formatAmounts(amount: number) {
    if (amount < 10) {
        return Math.round(amount * 4) / 4
    } else {
        return Math.round(amount)
    }
}