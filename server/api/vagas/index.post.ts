import { z } from 'zod'

const schema = z.object({
  empresa_id: z.string().uuid(),
  titulo: z.string().min(3).max(255),
  descricao: z.string().optional(),
  requisitos: z.string().optional(),
  salario: z.string().optional(),
  modalidade: z.enum(['presencial', 'remoto', 'hibrido']).optional(),
  cidade: z.string().optional()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.message })
  }

  const db = useDB()
  const { data, error } = await db
    .from('vagas')
    .insert(parsed.data)
    .select()
    .single()

  if (error) throw createError({ statusCode: 500, message: error.message })
  return data
})
