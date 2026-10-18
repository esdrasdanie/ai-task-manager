import { redirect } from 'react-router'
import type { Route } from './+types/task-new'
import { turso } from '~/turso'
import { TasksChatbot } from '~/features/tasks/tasks-chatbot'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const estimated_time = formData.get('estimated_time') as string
  const steps = formData.get('steps') as string
  const suggested_tests = formData.get('suggested_tests') as string
  const acceptance_criteria = formData.get('acceptance_criteria') as string
  const implementation_suggestion = formData.get('implementation_suggestion') as string

  await turso.execute({
    sql: 'INSERT INTO tasks (title, description, estimated_time, steps, suggested_tests, acceptance_criteria, implementation_suggestion) VALUES (?, ?, ?, ?, ?, ?, ?)',
    args: [title, description, estimated_time, steps, suggested_tests, acceptance_criteria, implementation_suggestion],
  })

  return redirect('/tasks')
}

export default function () {
  return <TasksChatbot />
}
