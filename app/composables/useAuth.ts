export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    await navigateTo('/auth/login')
  }

  const registrar = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  }

  return { user, login, logout, registrar }
}
