import type { Route } from './+types/tasks'
import { TasksList } from '~/features/tasks/tasks-list'

export async function loader() {
  return {}
}

export default function ({ loaderData }: Route.ComponentProps) {
  return <TasksList />
}
