import { useState } from "react"
import { ChatInterface, type TaskData } from "~/components/chat-interface"
import { TaskContent } from "./task-content"

export function TasksChatbot() {
    const [task, setTask] = useState<TaskData | null>(null)

    return (
        <div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-2 items-stretch gap-6 overflow-hidden p-6">
            <ChatInterface onTaskGenerated={setTask} />
            <TaskContent task={task} />
        </div>
    )
}
