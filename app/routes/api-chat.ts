import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { convertToModelMessages, streamText, type UIMessage } from "ai"

const SYSTEM_PROMPT = `Você é a Aura, uma assistente de gerenciamento de tarefas. Responda sempre em português do Brasil, de forma objetiva e prestativa.

Quando o usuário descrever uma tarefa ou pedir para criar uma task, responda normalmente em texto E inclua ao final da resposta um bloco JSON com exatamente este formato (sem markdown, sem código fence, apenas o JSON puro após a tag):

<task-json>
{
  "title": "título da task",
  "description": "descrição objetiva",
  "estimated_time": "ex: 2 days",
  "steps": ["passo 1", "passo 2"],
  "suggested_tests": ["it('teste 1')", "it('teste 2')"],
  "acceptance_criteria": ["critério 1", "critério 2"],
  "implementation_suggestion": "sugestão de implementação"
}
</task-json>

Só inclua o bloco <task-json> quando o usuário pedir explicitamente para criar uma task ou quando a conversa resultar claramente em uma tarefa definida.`

// Resource route: recebe as mensagens do useChat e devolve o stream da resposta.
export async function action({ request }: { request: Request }) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json()

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_GENERATIVE_API_KEY,
    })

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[api/chat] erro:", error)
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

