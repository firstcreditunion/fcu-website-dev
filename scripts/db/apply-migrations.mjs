import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REF = 'hojrhcbubaafsqjqvezq'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

function pat() {
  if (process.env.SUPABASE_ACCESS_TOKEN) return process.env.SUPABASE_ACCESS_TOKEN
  const mcp = JSON.parse(readFileSync(path.join(root, '.mcp.json'), 'utf8'))
  return mcp.mcpServers['supabase-fcu'].env.SUPABASE_ACCESS_TOKEN
}

async function run(query) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${pat()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) throw new Error(`Management API ${res.status}: ${await res.text()}`)
  return res.json()
}

// three separate idempotent calls: a partial first run can never leave the
// table created but unsecured
await run(`create table if not exists api.pt_migrations (
  version text primary key,
  applied_at timestamptz not null default now()
)`)
await run('alter table api.pt_migrations enable row level security')
await run('revoke all on api.pt_migrations from anon, authenticated')
const appliedRows = await run('select version from api.pt_migrations order by version')
const applied = new Set(appliedRows.map((r) => r.version))

const dir = path.join(root, 'supabase', 'migrations')
if (!existsSync(dir)) {
  console.log('no supabase/migrations directory; nothing to do')
  process.exit(0)
}
const files = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()
for (const file of files) {
  if (applied.has(file)) {
    console.log(`skip    ${file}`)
    continue
  }
  const sql = readFileSync(path.join(dir, file), 'utf8')
  if (/^\s*(begin|commit)\s*;/im.test(sql)) {
    throw new Error(`${file} contains begin/commit — the runner wraps files itself`)
  }
  await run(`begin;\n${sql}\ninsert into api.pt_migrations (version) values ('${file.replace(/'/g, "''")}');\ncommit;`)
  console.log(`applied ${file}`)
}
console.log('done')
