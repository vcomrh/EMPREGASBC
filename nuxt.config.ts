// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },

  modules: [
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/eslint'
  ],

  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/confirm',
      exclude: ['/', '/cadastro']
    }
  },

  runtimeConfig: {
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    mercadoPagoToken: process.env.MERCADO_PAGO_TOKEN,
    botApiKey: process.env.BOT_API_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    }
  }
})
