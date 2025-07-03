// src/strategies/PromocionalCDBStrategy.js

const CDBStrategy = require('./CDBStrategy');

// Esta classe herda de CDBStrategy, mas sobrescreve a descrição.
// Isso é útil para tratar produtos com regras ou nomes especiais.
class PromocionalCDBStrategy extends CDBStrategy {
  getDescricao() {
    const percentualFormatado = (this.percentualCDI * 100).toFixed(0);
    
    // Adiciona a informação de que é uma oferta promocional com limite.
    return `CDB ${percentualFormatado}% do CDI (Promocional): Oferta para investimentos de até R$ 5.000,00.`;
  }
}

module.exports = PromocionalCDBStrategy;