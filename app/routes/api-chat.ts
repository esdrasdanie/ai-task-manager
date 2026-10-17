import { convertToModelMessages, streamText, type UIMessage } from "ai"

// Resource route: recebe as mensagens do useChat e devolve o stream da resposta.
// Requer a variável de ambiente AI_GATEWAY_API_KEY (Vercel AI Gateway).
export async function action({ request }: { request: Request }) {
  const { messages }: { messages: UIMessage[] } = await request.json()

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system:
      "Você é a Aura, uma assistente de gerenciamento de tarefas. Responda sempre em português do Brasil, de forma objetiva e prestativa.",
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
