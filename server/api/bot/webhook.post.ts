import { z } from 'zod'

const schema = z.object({
  vaga_id: z.string().uuid(),
  nome: z.string().min(2),
  telefone: z.string().min(8),
  email: z.string().email().optional(),
  respostas: z.record(z.string())
})

export default defineEventHandler(async (event) => {
  // Valida API key do bot
  const apiKey = getHeader(event, 'x-bot-api-key')
  const config = useRuntimeConfig()
  if (apiKey !== config.botApiKey) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.message })
  }

  const db = useDB()
  const { data, error } = await db
    .from('candidatos')
    .insert({
      ...parsed.data,
      kanban_coluna: 'novo'
    })
    .select()
    .single()

  if (error) throw createError({ statusCode: 500, message: error.message })
  return { ok: true, candidato_id: data.id }
})
