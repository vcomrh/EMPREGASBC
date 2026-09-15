import { z } from 'zod'

const schema = z.object({
  kanban_coluna: z.enum(['novo', 'triagem', 'entrevista', 'aprovado', 'reprovado']).optional(),
  notas: z.string().optional()
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.message })
  }

  const db = useDB()
  const { data, error } = await db
    .from('candidatos')
    .update(parsed.data)
    .eq('id', id!)
    .select()
    .single()

  if (error) throw createError({ statusCode: 500, message: error.message })
  return data
})
