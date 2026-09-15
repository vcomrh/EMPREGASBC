export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const db = useDB()

  const { data, error } = await db
    .from('candidatos')
    .select('*')
    .eq('vaga_id', query.vaga_id as string)
    .order('created_at', { ascending: false })

  if (error) throw createError({ statusCode: 500, message: error.message })
  return data
})
