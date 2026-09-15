export const useAssinatura = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const verificar = async () => {
    if (!user.value) return null
    const { data, error } = await supabase
      .from('empresas')
      .select('assinatura_status, assinatura_expira_em')
      .eq('user_id', user.value.id)
      .single()
    if (error) throw error
    return data
  }

  const estaAtiva = async () => {
    const assinatura = await verificar()
    if (!assinatura) return false
    if (assinatura.assinatura_status !== 'ativa') return false
    if (!assinatura.assinatura_expira_em) return true
    return new Date(assinatura.assinatura_expira_em) > new Date()
  }

  return { verificar, estaAtiva }
}
