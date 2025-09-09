import Database from 'better-sqlite3'

const database = new Database('recipes.db')

database.prepare(`
  CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    cachedAt INTEGER NOT NULL
  )
`).run()

interface RecipeData {
    data: string,
    cachedAt?: number
}

export function saveRecipe(id: string, data: unknown) {
    const stmt = database.prepare('INSERT OR REPLACE INTO recipes (id, data, cachedAt) VALUES (?, ?, ?)')
    stmt.run(id, JSON.stringify(data), Date.now())
}


export function getRecipe(id: string) {
    const stmt = database.prepare('SELECT data, cachedAt FROM recipes WHERE id = ?')
    const row = stmt.get(id) as { data: string; cachedAt: number } | undefined
    return row ? { recipe: JSON.parse(row.data), cachedAt: row.cachedAt } : null
}  