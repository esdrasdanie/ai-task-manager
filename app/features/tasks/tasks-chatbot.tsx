import { ChatInterface } from "~/components/chat-interface";

export function TasksChatbot() {
    return <div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-2 gap-6 p-6">
        <ChatInterface />
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-white/50 text-muted-foreground shadow-sm">
            <div className="flex flex-col items-center gap-2 text-center opacity-40">
                <div className="size-12 rounded-full bg-muted" />
                <p className="text-sm font-medium">Área de Tarefas</p>
                <p className="max-w-[200px] text-xs">As tarefas relacionadas à conversa aparecerão aqui em breve.</p>
            </div>
        </div>
    </div>
}
