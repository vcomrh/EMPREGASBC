// Fluxo de triagem com 6 perguntas
export const PERGUNTAS = [
  'Qual é o seu nome completo?',
  'Qual é o seu telefone para contato?',
  'Qual é o seu e-mail? (opcional, pode digitar "não tenho")',
  'Qual é a sua experiência na área? Descreva brevemente.',
  'Qual é a sua disponibilidade de horário? (ex: manhã, tarde, noite, integral)',
  'Qual é a sua pretensão salarial?'
]

export type RespostasTriagem = {
  nome: string
  telefone: string
  email?: string
  experiencia: string
  disponibilidade: string
  pretensao_salarial: string
}
