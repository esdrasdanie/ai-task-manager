'use client'

import { useEffect, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import type { UIMessage } from 'ai'
import {
  ArrowUp,
  Bot,
  Check,
  Copy,
  Menu,
  Mic,
  MoreHorizontal,
  Paperclip,
  Plus,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  User,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Separator } from '~/components/ui/separator'
import { Textarea } from '~/components/ui/textarea'

type Conversation = { id: string; title: string; date: string; messages: UIMessage[] }

const initialConversations: Conversation[] = [
  { id: 'planejamento-semanal', title: 'Planejamento semanal', date: 'Hoje', messages: [] },
  { id: 'ideias-projeto', title: 'Ideias para o projeto', date: 'Ontem', messages: [] },
  { id: 'revisao-apresentacao', title: 'Revisão de apresentação', date: '12 de jun.', messages: [] },
  { id: 'receitas-rapidas', title: 'Receitas rápidas', date: '10 de jun.', messages: [] },
]

export function ChatInterface() {
  const { messages, sendMessage, status, setMessages, error } = useChat()
  const [input, setInput] = useState('')
  const [conversations, setConversations] = useState(initialConversations)
  const [activeId, setActiveId] = useState(initialConversations[0].id)
  const isLoading = status === 'submitted' || status === 'streaming'
  const activeConversation = conversations.find((conversation) => conversation.id === activeId)

  // Mantém a conversa ativa sincronizada com as mensagens do useChat e
  // renomeia "Nova conversa" a partir do primeiro texto enviado pelo usuário.
  useEffect(() => {
    setConversations((previous) =>
      previous.map((conversation) => {
        if (conversation.id !== activeId) return conversation
        const firstUserMessage = messages.find((message) => message.role === 'user')
        const firstUserText = firstUserMessage ? getText(firstUserMessage).trim() : ''
        return {
          ...conversation,
          messages,
          title:
            conversation.title === 'Nova conversa' && firstUserText
              ? firstUserText.slice(0, 40)
              : conversation.title,
        }
      }),
    )
  }, [messages, activeId])

  function handleNewConversation() {
    const id = crypto.randomUUID()
    setConversations((previous) => [
      { id, title: 'Nova conversa', date: 'Agora', messages: [] },
      ...previous,
    ])
    setActiveId(id)
    setMessages([])
  }

  function handleSelectConversation(id: string) {
    if (id === activeId) return
    const target = conversations.find((conversation) => conversation.id === id)
    if (!target) return
    setActiveId(id)
    setMessages(target.messages)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    await sendMessage({ text })
  }

  function getText(message: (typeof messages)[number]) {
    return message.parts
      .filter((part) => part.type === 'text')
      .map((part) => part.text)
      .join('')
  }

  return (
    <main className="flex min-h-0 min-w-0 flex-1 overflow-hidden rounded-2xl border border-border/50 bg-[#f8f8f6] text-[#1f2a22] shadow-sm">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-border/70 bg-white md:flex">
        <div className="flex h-20 shrink-0 items-center gap-3 px-6"><div className="flex size-9 items-center justify-center rounded-xl bg-[#242b25] text-white shadow-sm"><Sparkles className="size-4" /></div><span className="font-semibold tracking-tight">aura</span></div>
        <div className="shrink-0 px-4"><Button className="w-full justify-start gap-2 rounded-xl bg-[#242b25] text-white hover:bg-[#343d35]" onClick={handleNewConversation}><Plus data-icon="inline-start" /> Nova conversa</Button></div>
        <div className="min-h-0 flex-1 px-4 pt-8"><p className="px-2 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Conversas recentes</p><nav className="flex flex-col gap-1" aria-label="Conversas recentes">{conversations.map((conversation) => <button key={conversation.id} type="button" onClick={() => handleSelectConversation(conversation.id)} className={`flex items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition-colors ${conversation.id === activeId ? 'bg-[#f1f3ee] font-medium' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}><span className="truncate pr-3">{conversation.title}</span><span className="shrink-0 text-[11px] text-muted-foreground">{conversation.date}</span></button>)}</nav></div>
        <div className="shrink-0 border-t border-border/70 p-4"><button className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-muted/60"><Avatar className="size-9"><AvatarFallback className="bg-[#e6eee1] text-[#3e6041]">MC</AvatarFallback></Avatar><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">Marina Costa</span><span className="block truncate text-xs text-muted-foreground">Plano pessoal</span></span><MoreHorizontal className="size-4 text-muted-foreground" /></button></div>
      </aside>

      <section className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-border/70 bg-white/95 px-5 text-[#1f2a22] backdrop-blur md:px-10"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu"><Menu /></Button><div><div className="flex items-center gap-2"><h1 className="text-sm font-semibold">{activeConversation?.title ?? 'Nova conversa'}</h1><Badge variant="secondary" className="hidden rounded-full text-[10px] font-normal sm:inline-flex">Ativa</Badge></div><p className="text-xs text-muted-foreground">Aura está pronta para ajudar</p></div></div><div className="flex items-center gap-1"><Button variant="ghost" size="icon" aria-label="Mais opções"><MoreHorizontal /></Button><Button variant="outline" size="sm" className="hidden gap-2 rounded-full sm:flex">Compartilhar</Button></div></header>

        <ScrollArea className="min-h-0 flex-1"><div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-10 md:px-10 md:py-14"><div className="flex items-center justify-center gap-3 text-xs text-muted-foreground"><Separator className="max-w-24" /><span>Hoje</span><Separator className="max-w-24" /></div>{messages.length === 0 ? <div className="flex min-h-[45vh] flex-col items-center justify-center text-center"><div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#e6eee1] text-[#3e6041]"><Sparkles className="size-6" /></div><h2 className="text-xl font-semibold tracking-tight">Como posso ajudar?</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Comece uma nova conversa com a Aura.</p></div> : messages.map((message) => <MessageRow key={message.id} role={message.role} content={getText(message)} />)}{isLoading && <div className="flex items-start gap-3"><Avatar className="size-8 shrink-0"><AvatarFallback className="bg-[#242b25] text-white"><Bot className="size-4" /></AvatarFallback></Avatar><div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm"><div className="flex gap-1"><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" /><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" /><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" /></div></div></div>}</div></ScrollArea>
        {error && <p role="alert" className="mx-auto w-full max-w-3xl shrink-0 px-5 pb-2 text-center text-xs text-destructive md:px-10">Não foi possível gerar a resposta. Verifique a configuração do AI Gateway e tente novamente.</p>}

        <div className="shrink-0 border-t bg-white/50 p-4 backdrop-blur-sm"><div className="mx-auto w-full max-w-3xl"><form onSubmit={handleSubmit} className="relative rounded-2xl border border-border bg-white p-2 shadow-[0_8px_30px_rgba(30,40,30,0.06)]"><Textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); event.currentTarget.form?.requestSubmit() } }} placeholder="Escreva uma mensagem..." aria-label="Mensagem" className="min-h-14 resize-none border-0 bg-transparent pr-12 text-[#1f2a22] placeholder:text-[#667267] shadow-none focus-visible:ring-0" /><div className="flex items-center justify-between px-2 pb-1"><div className="flex items-center gap-1"><Button type="button" variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground" aria-label="Anexar arquivo"><Paperclip /></Button><Button type="button" variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground" aria-label="Usar microfone"><Mic /></Button><span className="ml-2 hidden text-xs text-muted-foreground sm:inline">Shift + Enter para nova linha</span></div><Button type="submit" size="icon" aria-label="Enviar mensagem" className="size-9 rounded-xl bg-[#242b25] text-white hover:bg-[#343d35]" isDisabled={!input.trim() || isLoading}><ArrowUp /></Button></div></form><p className="mt-3 text-center text-[11px] text-muted-foreground">A Aura pode cometer erros. Verifique informações importantes.</p></div></div>
      </section>
    </main>
  )
}

function MessageRow({ role, content }: { role: 'assistant' | 'user' | 'system'; content: string }) {
  const isAssistant = role !== 'user'
  return <div className={`flex items-start gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}><Avatar className="size-8 shrink-0">{isAssistant ? <AvatarFallback className="bg-[#242b25] text-white"><Bot className="size-4" /></AvatarFallback> : <AvatarFallback className="bg-[#e6eee1] text-[#3e6041]"><User className="size-4" /></AvatarFallback>}</Avatar><div className={`group max-w-[82%] ${isAssistant ? '' : 'items-end'}`}><div className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${isAssistant ? 'rounded-tl-md bg-white text-[#1f2a22] shadow-sm' : 'rounded-tr-md bg-[#242b25] text-white'}`}>{content}</div><div className={`mt-2 flex items-center gap-2 text-[11px] text-muted-foreground ${isAssistant ? '' : 'justify-end'}`}><span>agora</span>{isAssistant && <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100"><button aria-label="Copiar mensagem" className="rounded p-1 hover:bg-muted" onClick={() => navigator.clipboard.writeText(content)}><Copy className="size-3" /></button><button aria-label="Gostei" className="rounded p-1 hover:bg-muted"><ThumbsUp className="size-3" /></button><button aria-label="Não gostei" className="rounded p-1 hover:bg-muted"><ThumbsDown className="size-3" /></button></div>}{!isAssistant && <Check className="size-3 text-[#638165]" />}</div></div></div>
}
