import { Pencil, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { useLoaderData } from 'react-router'
import { loader } from '~/routes/tasks'

// const tasks = [
//   {
//     id: '1',
//     status: 'completed',
//     title: 'Project Planning',
//     description: 'Create initial project roadmap and timeline',
//     dueDate: 'Apr 15, 2024',
//     priority: 'High',
//   },
//   {
//     id: '2',
//     status: 'pending',
//     title: 'Database Setup',
//     description: 'Configure and initialize PostgreSQL database',
//     dueDate: 'Apr 16, 2024',
//     priority: 'High',
//   },
//   {
//     id: '3',
//     status: 'completed',
//     title: 'API Documentation',
//     description: 'Write comprehensive API documentation using Swagger',
//     dueDate: 'Apr 17, 2024',
//     priority: 'Medium',
//   },
//   {
//     id: '4',
//     status: 'pending',
//     title: 'User Authentication',
//     description: 'Implement JWT-based authentication system',
//     dueDate: 'Apr 18, 2024',
//     priority: 'High',
//   },
//   {
//     id: '5',
//     status: 'pending',
//     title: 'UI Components',
//     description: 'Create reusable UI component library',
//     dueDate: 'Apr 19, 2024',
//     priority: 'Medium',
//   },
// ]

export function TasksList() {
  const { tasks } = useLoaderData<typeof loader>()

  return (
    <div className='p-6'>
      <Table aria-label='Lista de Tarefas'>
        <TableHeader>
          <TableRow>
            <TableHead id='status' isRowHeader className='w-[50px]'>
              Status
            </TableHead>
            <TableHead id='title' className='w-[300px]'>
              Título
            </TableHead>
            <TableHead id='description'>Descrição</TableHead>
            <TableHead id='dueDate' className='w-[150px]'>
              Data de Entrega
            </TableHead>
            <TableHead id='priority' className='w-[100px]'>
              Estimativa
            </TableHead>
            <TableHead id='actions' className='w-[120px]'>
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: any) => (
            <TableRow key={task.id}>
              <TableCell className='font-medium'>{task.title}</TableCell>
              <TableCell className='w-[400px] max-w-[400px] truncate text-ellipsis overflow-hidden'>
                {task.description}
              </TableCell>
              <TableCell>
                {new Date(task.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{task.estimated_time}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8'
                    title='Edit task'
                  >
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 text-destructive hover:text-destructive'
                    title='Delete task'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
