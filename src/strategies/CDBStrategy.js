// Aluno: Álison Christian Rebouças Vidal de Carvalho - RA 2565765
// src/strategies/CDBStrategy.js

const EstrategiaInvestimento = require('./EstrategiaInvestimento');
const TaxasService = require('../services/TaxasService');

// Estratégia concreta para investimentos em CDBs pós-fixados.
class CDBStrategy extends EstrategiaInvestimento {
  constructor(percentualCDI) {
    super();
    this.percentualCDI = percentualCDI;
  }

  getDescricao() {
    // CORREÇÃO: Formata o número para evitar problemas com ponto flutuante.
    const percentualFormatado = (this.percentualCDI * 100).toFixed(0);
    return `CDB ${percentualFormatado}% do CDI: Título privado com rendimento atrelado à taxa CDI.`;
  }

  calcularRendimento(valor, prazoEmAnos) {
    const taxaCDI = TaxasService.getInstance().getCDI();
    const taxaRendimento = taxaCDI * this.percentualCDI;
    const rendimentoBruto = valor * Math.pow(1 + taxaRendimento, prazoEmAnos) - valor;

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
      investimento: `CDB ${(this.percentualCDI * 100).toFixed(0)}% CDI`,
      rendimentoBruto: rendimentoBruto.toFixed(2),
      aliquotaIR: `${(aliquotaIR * 100).toFixed(1)}%`,
      imposto: imposto.toFixed(2),
      rendimentoLiquido: rendimentoLiquido.toFixed(2),
    };
  }
}

module.exports = CDBStrategy;