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
import prisma from '../../prisma/prisma'

export async function loader() {
  return {
    users: await prisma.user.findMany(),
  }
}

export default function ({ loaderData }: Route.ComponentProps) {
  return (
    <div className='p-6 space-y-4'>
      <Table aria-label='Lista de Usuários'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>ID</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead className='w-[200px]'>Nome</TableHead>
            <TableHead className='w-[120px]'>Age</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loaderData.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className='font-mono text-xs'>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className='font-medium'>{user.name}</TableCell>
              <TableCell>{user.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
