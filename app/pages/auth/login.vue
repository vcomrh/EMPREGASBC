<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { login } = useAuth()
const router = useRouter()

const form = reactive({ email: '', password: '' })
const erro = ref('')
const carregando = ref(false)

const entrar = async () => {
  erro.value = ''
  carregando.value = true
  try {
    await login(form.email, form.password)
    await router.push('/empresa/painel')
  } catch (e: any) {
    erro.value = 'E-mail ou senha incorretos.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-blue-600">EmpregaSBC</h1>
      <p class="text-gray-500 mt-2">Acesse o painel da sua empresa</p>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-6">Entrar</h2>

      <form class="space-y-5" @submit.prevent="entrar">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="empresa@email.com"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <!-- Senha -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <!-- Erro -->
        <div v-if="erro" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
          {{ erro }}
        </div>

        <!-- Botão -->
        <button
          type="submit"
          :disabled="carregando"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition"
        >
          <span v-if="carregando">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>

    <!-- Rodapé -->
    <p class="text-center text-sm text-gray-400 mt-6">
      Ainda não tem conta?
      <a href="mailto:contato@empregasbc.com.br" class="text-blue-500 hover:underline">
        Entre em contato
      </a>
    </p>
  </div>
</template>
