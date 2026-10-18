import { ChatInterface } from "~/components/chat-interface";
import { TaskContent } from "./task-content";

export function TasksChatbot() {
    return <div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-2 items-stretch gap-6 overflow-hidden p-6">
        <ChatInterface />
        <TaskContent />
    </div>
}
