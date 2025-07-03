// src/services/TaxasService.js

// Garante uma instância única para o serviço que fornece as taxas de mercado.
class TaxasService {
  static #instance = null;
  #selic;
  #cdi;

  constructor() {
    // Valores de mercado de referência.
    this.#selic = 0.1490; // 14,90% a.a.
    this.#cdi = 0.1490;   // 14,90% a.a.
  }

  // Ponto de acesso global para a instância única (Singleton).
  static getInstance() {
    if (!TaxasService.#instance) {
      TaxasService.#instance = new TaxasService();
    }
    return TaxasService.#instance;
  }

  getSelic() {
    return this.#selic;
  }

  getCDI() {
    return this.#cdi;
  }
}

module.exports = TaxasService;