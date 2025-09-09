import Database from 'better-sqlite3'

const database = new Database('recipes.db')


interface RowType {
    id: string,
    data: string,
    cachedAt: number
}

const rows: RowType[] = database.prepare('SELECT * FROM recipes').all() as RowType[]


rows.forEach(row => {
    console.log('ID:', row.id)
    console.log('Cached At:', new Date(row.cachedAt).toLocaleString())
    console.log('Recipe Data:', JSON.parse(row.data))
    console.log('--------------------------')
})