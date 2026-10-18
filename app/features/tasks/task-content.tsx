import {
  CheckCircle2,
  Clock,
  FlaskConical,
  Lightbulb,
  ListChecks,
  ScrollText,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll-area'

const task = {
  title: 'Secure Login Form with Authentication',
  description:
    'Implement a modern login form with field validation, session-based authentication, and real-time error feedback.',
  estimated_time: '2 days',
  steps: [
    'Create a form component using React',
    'Add field validation using a suitable library',
    'Connect backend for user authentication',
    'Persist sessions using SQLite',
    'Test full login and logout flow',
  ],
  suggested_tests: [
    "it('should render login form correctly')",
    "it('should validate input fields')",
    "it('should authenticate valid credentials')",
    "it('should prevent access with invalid credentials')",
  ],
  acceptance_criteria: [
    'Login form displays properly with required fields',
    'Invalid input is correctly flagged',
    'Valid users can log in and maintain a session',
    'Users are redirected upon login and logout',
  ],
  implementation_suggestion:
    'Use React Hook Form for input validation, Prisma ORM for managing user data, and configure protected routes using React Router 7.',
}

export function TaskContent() {
  return (
    <section className="flex h-full flex-col overflow-hidden">
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="space-y-6">
          {/* Title + Description + Estimated Time Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <ScrollText className="h-5 w-5" />
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
              <p>{task.description}</p>
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Estimated time: {task.estimated_time}
              </div>
            </CardContent>
          </Card>

          {/* Steps Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <ListChecks className="h-5 w-5" />
              <CardTitle>Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {task.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Suggested Tests Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              <CardTitle>Suggested Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {task.suggested_tests.map((test, i) => (
                  <li key={i}>{test}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Acceptance Criteria Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <CardTitle>Acceptance Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                {task.acceptance_criteria.map((criterion, i) => (
                  <li key={i}>{criterion}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Implementation Suggestion Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              <CardTitle>Implementation Suggestion</CardTitle>
            </CardHeader>
            <CardContent>{task.implementation_suggestion}</CardContent>
          </Card>
        </div>
      </ScrollArea>
      <div className="flex justify-end">
        <Button>Salvar Task</Button>
      </div>
    </section>
  )
}
