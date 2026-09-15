-- ============================================================
-- EmpregaSBC - Schema do Banco de Dados (Supabase/PostgreSQL)
-- ============================================================

-- Tabela de empresas (vinculada ao auth.users do Supabase)
CREATE TABLE IF NOT EXISTS empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  cnpj_cpf VARCHAR(20),
  telefone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'empresa', -- 'empresa' | 'admin'
  assinatura_status VARCHAR(20) NOT NULL DEFAULT 'pendente', -- 'pendente' | 'ativa' | 'expirada' | 'cancelada'
  assinatura_expira_em TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de vagas
CREATE TABLE IF NOT EXISTS vagas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  requisitos TEXT,
  salario VARCHAR(100),
  modalidade VARCHAR(50), -- 'presencial' | 'remoto' | 'hibrido'
  cidade VARCHAR(100),
  status VARCHAR(20) NOT NULL DEFAULT 'ativa', -- 'ativa' | 'pausada' | 'encerrada'
  link_whatsapp TEXT, -- link gerado para o bot
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de candidatos (preenchida pelo bot do WhatsApp)
CREATE TABLE IF NOT EXISTS candidatos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vaga_id UUID NOT NULL REFERENCES vagas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  respostas JSONB NOT NULL DEFAULT '{}', -- respostas das 6 perguntas do bot
  kanban_coluna VARCHAR(30) NOT NULL DEFAULT 'novo', -- 'novo' | 'triagem' | 'entrevista' | 'aprovado' | 'reprovado'
  notas TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  valor NUMERIC(10,2) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'pendente', -- 'pendente' | 'aprovado' | 'recusado' | 'estornado'
  provedor VARCHAR(30) NOT NULL DEFAULT 'mercadopago',
  provedor_id VARCHAR(255), -- ID do pagamento no Mercado Pago
  periodo_inicio DATE,
  periodo_fim DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;

-- Empresa só vê seus próprios dados
CREATE POLICY "empresa_select_own" ON empresas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "empresa_update_own" ON empresas
  FOR UPDATE USING (auth.uid() = user_id);

-- Vagas: empresa vê apenas as suas
CREATE POLICY "vaga_select_own" ON vagas
  FOR SELECT USING (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

CREATE POLICY "vaga_insert_own" ON vagas
  FOR INSERT WITH CHECK (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

CREATE POLICY "vaga_update_own" ON vagas
  FOR UPDATE USING (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

-- Candidatos: empresa vê apenas os das suas vagas
CREATE POLICY "candidato_select_own" ON candidatos
  FOR SELECT USING (
    vaga_id IN (
      SELECT v.id FROM vagas v
      JOIN empresas e ON e.id = v.empresa_id
      WHERE e.user_id = auth.uid()
    )
  );

CREATE POLICY "candidato_update_own" ON candidatos
  FOR UPDATE USING (
    vaga_id IN (
      SELECT v.id FROM vagas v
      JOIN empresas e ON e.id = v.empresa_id
      WHERE e.user_id = auth.uid()
    )
  );

-- Pagamentos: empresa vê os seus
CREATE POLICY "pagamento_select_own" ON pagamentos
  FOR SELECT USING (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

-- ============================================================
-- Triggers para updated_at automático
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_empresas_updated_at
  BEFORE UPDATE ON empresas
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_vagas_updated_at
  BEFORE UPDATE ON vagas
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_candidatos_updated_at
  BEFORE UPDATE ON candidatos
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
