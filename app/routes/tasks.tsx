import prisma from '../../prisma/prisma'
import type { Route } from './+types/tasks'
import { TasksList } from '~/features/tasks/tasks-list'

export async function loader() {
  const tasks = await prisma.task.findMany()
  return { tasks }
}

export default function ({ loaderData }: Route.ComponentProps) {
  return <TasksList tasks={loaderData.tasks} />
}
