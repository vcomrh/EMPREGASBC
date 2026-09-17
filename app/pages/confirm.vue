<script setup lang="ts">
// Página de callback do Supabase após autenticação
// O @nuxtjs/supabase redireciona aqui automaticamente após o login
const user = useSupabaseUser()
const router = useRouter()

watchEffect(() => {
  if (user.value) {
    router.push('/empresa/painel')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
      <p class="text-gray-500">Autenticando...</p>
    </div>
  </div>
</template>
