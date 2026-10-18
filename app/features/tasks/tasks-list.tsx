import type { Row } from '@libsql/client'
import { Badge } from '~/components/ui/badge'

type Task = Row

type TasksListProps = {
  tasks: Task[]
}

const priorityVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  high: 'destructive',
  medium: 'default',
  low: 'secondary',
}

export function TasksList({ tasks }: TasksListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 py-20 text-center text-muted-foreground">
        <p className="text-sm font-medium">Nenhuma task encontrada</p>
        <p className="text-xs">Crie uma nova task no chat da Aura.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="pb-3 pr-4 font-medium">Status</th>
            <th className="pb-3 pr-4 font-medium">Título</th>
            <th className="pb-3 pr-4 font-medium">Descrição</th>
            <th className="pb-3 font-medium">Prioridade</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={String(task.id)} className="border-b last:border-0 hover:bg-muted/40">
              <td className="py-3 pr-4">
                <span
                  className={`inline-block size-3 rounded-full ${
                    task.status === 'done' ? 'bg-green-500' : 'bg-muted-foreground/30'
                  }`}
                />
              </td>
              <td className="py-3 pr-4 font-medium">{String(task.title)}</td>
              <td className="max-w-sm truncate py-3 pr-4 text-muted-foreground">
                {String(task.description ?? '')}
              </td>
              <td className="py-3">
                <Badge variant={priorityVariant[String(task.priority)] ?? 'secondary'}>
                  {String(task.priority ?? 'medium')}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
