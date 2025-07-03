// Aluno: Álison Christian Rebouças Vidal de Carvalho - RA 2565765
// src/strategies/EstrategiaInvestimento.js

// Define o contrato (interface) para todas as estratégias de investimento.
class EstrategiaInvestimento {
  constructor() {
    if (this.constructor === EstrategiaInvestimento) {
      throw new Error("A classe abstrata 'EstrategiaInvestimento' não pode ser instanciada.");
    }
  }

  // Contrato para o método de cálculo de rendimento.
  calcularRendimento(valor, prazoEmAnos) {
    throw new Error("O método 'calcularRendimento()' deve ser implementado.");
  }

  // Contrato para o método que retorna a descrição do produto.
  getDescricao() {
    throw new Error("O método 'getDescricao()' deve ser implementado.");
  }
}

module.exports = EstrategiaInvestimento;