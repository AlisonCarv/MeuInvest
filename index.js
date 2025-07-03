// index.js

const readline = require('readline');
const InvestimentoFactory = require('./src/factories/InvestimentoFactory');

// Configura a interface para ler dados do terminal.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Função principal que orquestra a simulação.
 * @param {number} valor O montante a ser investido.
 * @param {number} prazoEmAnos O período do investimento em anos.
 */
function simularInvestimento(valor, prazoEmAnos) {
  console.log("\n=================================================");
  console.log(`Buscando recomendações para R$ ${valor.toFixed(2)} por ${prazoEmAnos} ano(s)...`);
  console.log("=================================================\n");

  const estrategias = InvestimentoFactory.criarEstrategiasRecomendadas(valor);

  if (estrategias.length === 0) {
    console.log("Nenhuma opção de investimento encontrada para este valor.");
    return;
  }

  console.log("Opções encontradas:\n");

  estrategias.forEach(estrategia => {
    const resultado = estrategia.calcularRendimento(valor, prazoEmAnos);

    // Saída detalhada e completa, conforme RF03.
    console.log(`--- ${estrategia.getDescricao()} ---`);
    console.log(`  - Rendimento Bruto: R$ ${resultado.rendimentoBruto}`);
    console.log(`  - Alíquota de IR: ${resultado.aliquotaIR}`);
    console.log(`  - Imposto de Renda: R$ ${resultado.imposto}`);
    console.log(`  - Rendimento Líquido: R$ ${resultado.rendimentoLiquido}`);
    console.log(`  - Montante Final: R$ ${(valor + parseFloat(resultado.rendimentoLiquido)).toFixed(2)}`);
    console.log("\n");
  });
}

/**
 * Função que gerencia a interação com o usuário, solicitando os dados de entrada.
 */
function iniciarConsulta() {
  console.log("--- MeuInvest: Consultor de Investimentos Inteligente ---");
  
  rl.question("Qual valor você deseja investir? (ex: 10000): ", (valorInput) => {
    rl.question("Por quantos anos? (ex: 1): ", (prazoInput) => {
      
      const valor = parseFloat(valorInput);
      const prazo = parseFloat(prazoInput);

      // Validação da entrada do usuário.
      if (isNaN(valor) || isNaN(prazo) || valor <= 0 || prazo <= 0) {
        console.error("\nErro: Por favor, insira valores numéricos e positivos.");
      } else {
        simularInvestimento(valor, prazo);
      }
      
      // Encerra o programa após a execução.
      rl.close();
    });
  });
}

// Inicia a execução do programa.
iniciarConsulta();