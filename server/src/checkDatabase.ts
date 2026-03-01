import Database from 'better-sqlite3'

const database = new Database('recipes.db')

interface RowType {
  id: string,
  data: string,
  cachedAt: number
}

const rows: RowType[] = database.prepare('SELECT * FROM recipes').all() as RowType[]
