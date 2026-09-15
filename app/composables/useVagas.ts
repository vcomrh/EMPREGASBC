export const useVagas = () => {
  const supabase = useSupabaseClient()

  const listar = async (empresaId: string) => {
    const { data, error } = await supabase
      .from('vagas')
      .select('*')
      .eq('empresa_id', empresaId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  }

  const criar = async (vaga: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from('vagas')
      .insert(vaga)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const atualizar = async (id: string, campos: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from('vagas')
      .update(campos)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const remover = async (id: string) => {
    const { error } = await supabase.from('vagas').delete().eq('id', id)
    if (error) throw error
  }

  return { listar, criar, atualizar, remover }
}
