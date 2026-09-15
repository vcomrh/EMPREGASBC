export default defineEventHandler(async (event) => {
  const db = useDB()
  const query = getQuery(event)

  const { data, error } = await db
    .from('vagas')
    .select('*')
    .eq('empresa_id', query.empresa_id as string)
    .order('created_at', { ascending: false })

  if (error) throw createError({ statusCode: 500, message: error.message })
  return data
})
