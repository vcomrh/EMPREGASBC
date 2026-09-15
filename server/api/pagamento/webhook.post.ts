export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = useDB()

  // Mercado Pago envia notificações de pagamento aqui
  // Implementação completa será feita na etapa de pagamentos
  if (body?.type === 'payment' && body?.data?.id) {
    console.log('[Pagamento] Notificação recebida:', body.data.id)
    // TODO: consultar status no MP e atualizar assinatura
  }

  return { ok: true }
})
