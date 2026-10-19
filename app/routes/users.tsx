import { Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { turso } from '~/turso'
import type { Route } from './+types/users'

export interface User {
  id: number
  email: string
  name: string
  password_hash: string
  created_at: string
  updated_at: string
  is_active: number
  last_login: string | null
}

export async function loader() {
  const response = await turso.execute('SELECT * FROM USERS')

  return {
    users: response.rows as unknown as User[],
  }
}

export default function Users({ loaderData }: Route.ComponentProps) {
  const { users } = loaderData

  return (
    <div className='p-6 space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Usuários</h1>
      </div>

      <div className='rounded-md border bg-card'>
        <Table aria-label='Lista de Usuários'>
          <TableHeader>
            <TableHead id='id' isRowHeader className='w-[60px]'>
              ID
            </TableHead>
            <TableHead id='name' className='w-[200px]'>
              Nome
            </TableHead>
            <TableHead id='email'>E-mail</TableHead>
            <TableHead id='status' className='w-[120px]'>
              Status
            </TableHead>
            <TableHead id='actions' className='w-[100px]'>
              Ações
            </TableHead>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} id={String(user.id)}>
                <TableCell className='font-mono text-xs'>{user.id}</TableCell>
                <TableCell className='font-medium'>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-1.5'>
                    {user.is_active === 1 ? (
                      <>
                        <CheckCircle2 className='h-4 w-4 text-green-500' />
                        <span className='text-xs text-muted-foreground'>
                          Ativo
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className='h-4 w-4 text-destructive' />
                        <span className='text-xs text-muted-foreground'>
                          Inativo
                        </span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-1'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      title='Editar usuário'
                    >
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-destructive hover:text-destructive'
                      title='Excluir usuário'
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
    </div>
  )
}
