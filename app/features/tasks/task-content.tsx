import {
  CheckCircle2,
  Clock,
  FlaskConical,
  Lightbulb,
  ListChecks,
  ScrollText,
  Sparkles,
} from 'lucide-react'
import { Form } from 'react-router'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll-area'
import type { TaskData } from '~/components/chat-interface'

type TaskContentProps = {
  task: TaskData | null
}

export function TaskContent({ task }: TaskContentProps) {
  if (!task) {
    return (
      <section className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-white/50 text-muted-foreground">
        <div className="flex flex-col items-center gap-2 text-center opacity-40">
          <Sparkles className="size-10" />
          <p className="text-sm font-medium">Nenhuma task gerada ainda</p>
          <p className="max-w-[200px] text-xs">Descreva uma tarefa no chat e a Aura irá gerá-la aqui.</p>
        </div>
      </section>
    )
  }

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
      <Form method="post" action="/task/new">
        <input type="hidden" name="title" value={task.title} />
        <input type="hidden" name="description" value={task.description} />
        <input type="hidden" name="estimated_time" value={task.estimated_time} />
        <input type="hidden" name="steps" value={JSON.stringify(task.steps)} />
        <input type="hidden" name="suggested_tests" value={JSON.stringify(task.suggested_tests)} />
        <input type="hidden" name="acceptance_criteria" value={JSON.stringify(task.acceptance_criteria)} />
        <input type="hidden" name="implementation_suggestion" value={task.implementation_suggestion} />
        <div className="flex justify-end p-2">
          <Button type="submit">Salvar Task</Button>
        </div>
      </Form>
    </section>
  )
}
