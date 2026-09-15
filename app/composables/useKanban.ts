export type KanbanColuna = 'novo' | 'triagem' | 'entrevista' | 'aprovado' | 'reprovado'

export const COLUNAS: { id: KanbanColuna; label: string; cor: string }[] = [
  { id: 'novo', label: 'Novos', cor: 'blue' },
  { id: 'triagem', label: 'Em Triagem', cor: 'yellow' },
  { id: 'entrevista', label: 'Entrevista', cor: 'purple' },
  { id: 'aprovado', label: 'Aprovados', cor: 'green' },
  { id: 'reprovado', label: 'Reprovados', cor: 'red' }
]

export const useKanban = (candidatos: Ref<any[]>) => {
  const { moverKanban } = useCandidatos()

  const porColuna = (coluna: KanbanColuna) =>
    computed(() => candidatos.value.filter(c => c.kanban_coluna === coluna))

  const mover = async (candidatoId: string, novaColuna: KanbanColuna) => {
    await moverKanban(candidatoId, novaColuna)
    const candidato = candidatos.value.find(c => c.id === candidatoId)
    if (candidato) candidato.kanban_coluna = novaColuna
  }

  return { porColuna, mover, COLUNAS }
}
