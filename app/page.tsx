'use client'

import { FormEvent, useState } from 'react'
import { ArrowUp, Bot, Check, ChevronDown, Copy, Menu, Mic, MoreHorizontal, Paperclip, Plus, Sparkles, ThumbsDown, ThumbsUp, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

type Message = { id: number; role: 'assistant' | 'user'; content: string; time: string }

const starterMessages: Message[] = [
  { id: 1, role: 'assistant', content: 'Olá! Eu sou a Aura, sua assistente inteligente. Como posso ajudar você hoje?', time: '10:42' },
  { id: 2, role: 'user', content: 'Preciso organizar minhas prioridades para esta semana.', time: '10:43' },
  { id: 3, role: 'assistant', content: 'Claro! Vamos tornar isso simples. Quais são as três coisas mais importantes que você precisa concluir?', time: '10:43' },
]

const conversations = [
  { title: 'Planejamento semanal', date: 'Hoje', active: true },
  { title: 'Ideias para o projeto', date: 'Ontem' },
  { title: 'Revisão de apresentação', date: '12 de jun.' },
  { title: 'Receitas rápidas', date: '10 de jun.' },
]

export default function Page() {
  const [messages, setMessages] = useState<Message[]>(starterMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = input.trim()
    if (!text || isTyping) return
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    setMessages((current) => [...current, { id: Date.now(), role: 'user', content: text, time: now }])
    setInput('')
    setIsTyping(true)
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', content: 'Entendi. Vou ajudar você a transformar isso em um próximo passo claro e fácil de executar.', time: now }])
      setIsTyping(false)
    }, 900)
  }

  return (
    <>
      <main className="flex min-h-screen bg-[#f8f8f6] text-[#1f2a22]">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-border/70 bg-white md:flex">
          <div className="flex h-20 items-center gap-3 px-6">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#242b25] text-white shadow-sm"><Sparkles className="size-4" /></div>
            <span className="font-semibold tracking-tight">aura</span>
          </div>
          <div className="px-4">
            <Button className="w-full justify-start gap-2 rounded-xl bg-[#242b25] text-white hover:bg-[#343d35]" onClick={() => setMessages([])}><Plus data-icon="inline-start" /> Nova conversa</Button>
          </div>
          <div className="flex-1 px-4 pt-8">
            <p className="px-2 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Conversas recentes</p>
            <nav className="flex flex-col gap-1" aria-label="Conversas recentes">
              {conversations.map((conversation) => (
                <button key={conversation.title} className={`flex items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition-colors ${conversation.active ? 'bg-[#f1f3ee] font-medium' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}>
                  <span className="truncate pr-3">{conversation.title}</span><span className="shrink-0 text-[11px] text-muted-foreground">{conversation.date}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="border-t border-border/70 p-4"><button className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-muted/60"><Avatar className="size-9"><AvatarFallback className="bg-[#e6eee1] text-[#3e6041]">MC</AvatarFallback></Avatar><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">Marina Costa</span><span className="block truncate text-xs text-muted-foreground">Plano pessoal</span></span><MoreHorizontal className="size-4 text-muted-foreground" /></button></div>
        </aside>

        <section className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="flex h-20 items-center justify-between border-b border-border/70 bg-white/95 px-5 text-[#1f2a22] backdrop-blur md:px-10">
            <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="md:hidden"><Menu /></Button><div><div className="flex items-center gap-2"><h1 className="text-sm font-semibold">Planejamento semanal</h1><Badge variant="secondary" className="hidden rounded-full text-[10px] font-normal sm:inline-flex">Ativa</Badge></div><p className="text-xs text-muted-foreground">Aura está pronta para ajudar</p></div></div>
            <div className="flex items-center gap-1"><Button variant="ghost" size="icon" aria-label="Mais opções" title="Mais opções"><MoreHorizontal /></Button><Button variant="outline" size="sm" className="hidden gap-2 rounded-full sm:flex">Compartilhar</Button></div>
          </header>

          <ScrollArea className="flex-1">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-10 md:px-10 md:py-14">
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground"><Separator className="max-w-24" /><span>Hoje, 10:42</span><Separator className="max-w-24" /></div>
              {messages.length === 0 ? <div className="flex min-h-[45vh] flex-col items-center justify-center text-center"><div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#e6eee1] text-[#3e6041]"><Sparkles className="size-6" /></div><h2 className="text-xl font-semibold tracking-tight">Como posso ajudar?</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Comece uma nova conversa com a Aura.</p></div> : messages.map((message) => <MessageRow key={message.id} message={message} />)}
              {isTyping && <div className="flex items-start gap-3"><Avatar className="size-8 shrink-0"><AvatarFallback className="bg-[#242b25] text-white"><Bot className="size-4" /></AvatarFallback></Avatar><div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm"><div className="flex gap-1"><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" /><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" /><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" /></div></div></div>}
            </div>
          </ScrollArea>

          <div className="mx-auto w-full max-w-3xl px-5 pb-6 md:px-10 md:pb-8"><form onSubmit={handleSubmit} className="relative rounded-2xl border border-border bg-white p-2 shadow-[0_8px_30px_rgba(30,40,30,0.06)]"><Textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escreva uma mensagem..." aria-label="Mensagem" className="min-h-14 resize-none border-0 bg-transparent pr-12 text-[#1f2a22] placeholder:text-[#667267] shadow-none focus-visible:ring-0" /><div className="flex items-center justify-between px-2 pb-1"><div className="flex items-center gap-1"><Button type="button" variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground"><Paperclip /></Button><Button type="button" variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground"><Mic /></Button><span className="ml-2 hidden text-xs text-muted-foreground sm:inline">Shift + Enter para nova linha</span></div><Button type="submit" size="icon" aria-label="Enviar mensagem" className="size-9 rounded-xl bg-[#242b25] text-white hover:bg-[#343d35]" disabled={!input.trim() || isTyping}><ArrowUp /></Button></div></form><p className="mt-3 text-center text-[11px] text-muted-foreground">A Aura pode cometer erros. Verifique informações importantes.</p></div>
        </section>
      </main>
    </>
  )
}

function MessageRow({ message }: { message: Message }) {
  const isAssistant = message.role === 'assistant'
  return <div className={`flex items-start gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}><Avatar className="size-8 shrink-0">{isAssistant ? <AvatarFallback className="bg-[#242b25] text-white"><Bot className="size-4" /></AvatarFallback> : <AvatarFallback className="bg-[#e6eee1] text-[#3e6041]"><User className="size-4" /></AvatarFallback>}</Avatar><div className={`group max-w-[82%] ${isAssistant ? '' : 'items-end'}`}><div className={`rounded-2xl px-4 py-3 text-sm leading-6 ${isAssistant ? 'rounded-tl-md bg-white text-[#1f2a22] shadow-sm' : 'rounded-tr-md bg-[#242b25] text-white'}`}>{message.content}</div><div className={`mt-2 flex items-center gap-2 text-[11px] text-muted-foreground ${isAssistant ? '' : 'justify-end'}`}><span>{message.time}</span>{isAssistant && <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100"><button aria-label="Copiar mensagem" className="rounded p-1 hover:bg-muted"><Copy className="size-3" /></button><button aria-label="Gostei" className="rounded p-1 hover:bg-muted"><ThumbsUp className="size-3" /></button><button aria-label="Não gostei" className="rounded p-1 hover:bg-muted"><ThumbsDown className="size-3" /></button></div>}{!isAssistant && <Check className="size-3 text-[#638165]" />}</div></div></div>
}
