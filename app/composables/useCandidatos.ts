export const useCandidatos = () => {
  const supabase = useSupabaseClient()

  const listarPorVaga = async (vagaId: string) => {
    const { data, error } = await supabase
      .from('candidatos')
      .select('*')
      .eq('vaga_id', vagaId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  }

  const moverKanban = async (id: string, coluna: string) => {
    const { data, error } = await supabase
      .from('candidatos')
      .update({ kanban_coluna: coluna })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  return { listarPorVaga, moverKanban }
}
