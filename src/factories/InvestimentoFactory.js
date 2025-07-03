// Aluno: Álison Christian Rebouças Vidal de Carvalho - RA 2565765
// src/factories/InvestimentoFactory.js

const TesouroSelicStrategy = require('../strategies/TesouroSelicStrategy');
const CDBStrategy = require('../strategies/CDBStrategy');
const PromocionalCDBStrategy = require('../strategies/PromocionalCDBStrategy');

// Cria instâncias de estratégias com base em regras de negócio.
class InvestimentoFactory {
  static criarEstrategiasRecomendadas(valor) {
    const recomendacoes = [];

    // Regra 1: Tesouro Selic (mínimo de R$ 149).
    if (valor >= 149) {
      recomendacoes.push(new TesouroSelicStrategy());
    }
    
    // Regra 2: CDB 110% (de R$ 500 a R$ 100.000).
    if (valor >= 500 && valor <= 100000) {
      recomendacoes.push(new CDBStrategy(1.10));
    }

    // Regra 3: CDB 120% (promocional, até R$ 5.000).
    if (valor <= 5000) {
      // Usa a nova classe de estratégia para a oferta promocional.
      recomendacoes.push(new PromocionalCDBStrategy(1.20));
    }

    return recomendacoes;
  }
}

module.exports = InvestimentoFactory;