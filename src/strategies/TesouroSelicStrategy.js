// Aluno: Álison Christian Rebouças Vidal de Carvalho - RA 2565765
// src/strategies/TesouroSelicStrategy.js

const EstrategiaInvestimento = require('./EstrategiaInvestimento');
const TaxasService = require('../services/TaxasService');

// Estratégia concreta para investimento no Tesouro Selic.
class TesouroSelicStrategy extends EstrategiaInvestimento {
  getDescricao() {
    return "Tesouro Selic: Título público de baixo risco, com rendimento atrelado à taxa SELIC.";
  }

  calcularRendimento(valor, prazoEmAnos) {
    const taxaSelic = TaxasService.getInstance().getSelic();
    const rendimentoBruto = valor * Math.pow(1 + taxaSelic, prazoEmAnos) - valor;

    // Aplica a tabela regressiva de Imposto de Renda.
    let aliquotaIR;
    const prazoEmDias = prazoEmAnos * 365;
    if (prazoEmDias <= 180) aliquotaIR = 0.225;
    else if (prazoEmDias <= 360) aliquotaIR = 0.20;
    else if (prazoEmDias <= 720) aliquotaIR = 0.175;
    else aliquotaIR = 0.15;

    const imposto = rendimentoBruto * aliquotaIR;
    const rendimentoLiquido = rendimentoBruto - imposto;

    return {
      investimento: "Tesouro Direto SELIC",
      rendimentoBruto: rendimentoBruto.toFixed(2),
      aliquotaIR: `${(aliquotaIR * 100).toFixed(1)}%`,
      imposto: imposto.toFixed(2),
      rendimentoLiquido: rendimentoLiquido.toFixed(2),
    };
  }
}

module.exports = TesouroSelicStrategy;