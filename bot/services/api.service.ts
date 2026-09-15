// Envia dados do candidato para o backend EmpregaSBC
export const enviarCandidato = async (dados: {
  vaga_id: string
  nome: string
  telefone: string
  email?: string
  respostas: Record<string, string>
}) => {
  const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const apiKey = process.env.BOT_API_KEY || ''

  const res = await fetch(`${baseUrl}/api/bot/webhook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-bot-api-key': apiKey
    },
    body: JSON.stringify(dados)
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Erro ao enviar candidato: ${err}`)
  }

  return res.json()
}
