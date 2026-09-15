export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo('/auth/login')
  }

  const supabase = useSupabaseClient()
  const { data } = await supabase
    .from('empresas')
    .select('role')
    .eq('user_id', user.value.id)
    .single()

  if (data?.role !== 'admin') {
    return navigateTo('/empresa/painel')
  }
})
