import type { Route } from './+types/tasks'
import { TasksList } from '~/features/tasks/tasks-list'
import { turso } from '~/turso'

export async function loader() {
  // Cria o usuário seed apenas se ainda não existir
  await turso.execute(
    "INSERT OR IGNORE INTO users (email, name, password_hash) VALUES ('esdrasdaniel1016@gmail.com', 'Esdras Daniel', '$2y$10$yXg0GGVoP53RuxtVSzEvCeyrMcxQjHNQFjHM8F21C8e0wcHo2slCK')",
  )

  // Busca todas as tasks
  const result = await turso.execute('SELECT * FROM tasks ORDER BY created_at DESC')
  return { tasks: result.rows }
}

export default function ({ loaderData }: Route.ComponentProps) {
  return <TasksList tasks={loaderData.tasks} />
}
