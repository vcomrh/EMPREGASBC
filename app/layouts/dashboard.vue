<script setup lang="ts">
const { logout, user } = useAuth()
const route = useRoute()

const navEmpresa = [
  { label: 'Painel', icon: '📊', to: '/empresa/painel' },
  { label: 'Vagas', icon: '💼', to: '/empresa/vagas' },
  { label: 'Configurações', icon: '⚙️', to: '/empresa/configuracoes' }
]

const navAdmin = [
  { label: 'Painel', icon: '📊', to: '/admin/painel' },
  { label: 'Empresas', icon: '🏢', to: '/admin/empresas' },
  { label: 'Vagas', icon: '💼', to: '/admin/vagas' }
]

const isAdmin = computed(() => route.path.startsWith('/admin'))
const navItems = computed(() => isAdmin.value ? navAdmin : navEmpresa)

const saindo = ref(false)
const sair = async () => {
  saindo.value = true
  await logout()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
      <!-- Logo -->
      <div class="px-6 py-5 border-b border-gray-100">
        <h1 class="text-xl font-bold text-blue-600">EmpregaSBC</h1>
        <p class="text-xs text-gray-400 mt-0.5">
          {{ isAdmin ? 'Administrador' : 'Painel da Empresa' }}
        </p>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-4 py-4 space-y-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition"
          :class="route.path === item.to
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
        >
          <span>{{ item.icon }}</span>
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Footer com usuário -->
      <div class="px-4 py-4 border-t border-gray-100">
        <div class="flex items-center gap-3 px-3 py-2 mb-2">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
            {{ user?.email?.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
          </div>
        </div>
        <button
          :disabled="saindo"
          class="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          @click="sair"
        >
          <span>🚪</span>
          {{ saindo ? 'Saindo...' : 'Sair' }}
        </button>
      </div>
    </aside>

    <!-- Conteúdo principal -->
    <div class="flex-1 ml-64 flex flex-col">
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
