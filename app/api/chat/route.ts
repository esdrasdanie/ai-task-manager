import { convertToModelMessages, streamText } from 'ai'
import { gateway } from 'ai'

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: gateway('google/gemini-2.5-flash'),
    system:
      'Você é a Aura, uma assistente útil, objetiva e acolhedora. Responda sempre em português do Brasil. Ajude o usuário a transformar ideias em próximos passos práticos.',
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
