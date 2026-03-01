import Database from 'better-sqlite3'
import { Recipe } from '../types/types'

const database = new Database('recipes.db')

database.prepare(`
  CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    cachedAt INTEGER NOT NULL
  )
`).run()

export function saveRecipe(id: string, data: Recipe) {
    const stmt = database.prepare('INSERT OR REPLACE INTO recipes (id, data, cachedAt) VALUES (?, ?, ?)')
    stmt.run(id, JSON.stringify(data), Date.now())
}

export function getRecipe(id: string): { recipe: Recipe; cachedAt: number } | null {
  const stmt = database.prepare('SELECT data, cachedAt FROM recipes WHERE id = ?')
  const row = stmt.get(id) as { data: string; cachedAt: number } | undefined

  if (!row) return null
  const parsedData = JSON.parse(row.data) as Recipe

  return {
    recipe: parsedData,
    cachedAt: row.cachedAt
  }
}
