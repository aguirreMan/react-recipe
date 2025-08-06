import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
dotenv.config()

const app: Application = express()
const port: number = parseInt(process.env.PORT || '3000', 10)

app.use(cors())
app.use(express.json())

interface SpoonacularResultsComplexSearch {
    id: number,
    title: string,
    image: string,
    imageType?: string
}

interface ComplexSearchResponse {
    results: SpoonacularResultsComplexSearch[],
    offset: number,
    number: number,
    totalResults: number
}

app.get('/complexSearch', async (req: Request, res: Response) => {
    const query = req.query.query || undefined
    const number: number = parseInt(String(req.query.number), 10) || 60
    const offset: number = parseInt(String(req.query.offset), 10) || 0
    const random: boolean = req.query.random === 'true'
    const apiKey = process.env.SPOONACULAR_API_KEY

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' })
    }

    let url: string = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${number}&apiKey=${apiKey}`
    if (random) {
        url += '&sort=random'
    } else {
        url += `&offset=${offset}`
    }

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('API error')
        }
        const data: ComplexSearchResponse = await response.json()
        res.json(data)
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch complex search results' })
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
