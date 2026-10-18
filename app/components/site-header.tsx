import { useLocation } from 'react-router'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { SidebarTrigger } from '~/components/ui/sidebar'

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/tasks': 'Tasks',
  '/task/new': 'Nova Task',
  '/task/edit': 'Editar Task',
}

export function SiteHeader() {
  const { pathname } = useLocation()

  const getTitle = () => {
    if (pathname.startsWith('/task/edit/')) return 'Editar Task'
    return routeTitles[pathname] ?? 'Not Found'
  }

  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 h-4 data-vertical:self-auto'
        />
        <h1 className='text-base font-medium'>{getTitle()}</h1>
        <div className='ml-auto flex items-center gap-2'>
          <a
            href='https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard'
            rel='noopener noreferrer'
            target='_blank'
            className='hidden sm:flex'
          >
            <Button variant='ghost' size='sm'>GitHub</Button>
          </a>
        </div>
      </div>
    </header>
  )
}
