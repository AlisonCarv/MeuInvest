# MeuInvest: Consultor de Investimentos Inteligente

## 1. Visão Geral

MeuInvest é um protótipo de sistema de linha de comando (CLI) que atua como um consultor de investimentos simplificado. O usuário informa um valor e um prazo, e o sistema recomenda os produtos de investimento mais adequados com base em um conjunto de regras de negócio, fornecendo uma simulação detalhada do rendimento líquido esperado.

### Contexto do Projeto

Este projeto foi desenvolvido como trabalho final para a disciplina de Arquitetura de Software, ministrada pelo Prof. Adriano Rivolli no curso de Engenharia de Software da Universidade Tecnológica Federal do Paraná (UTFPR).

O foco principal não é a criação de um produto comercial, mas a aplicação prática de conceitos arquiteturais para construir um software extensível, manutenível e confiável, utilizando os padrões e princípios estudados em aula.

## 2. Conceitos Arquiteturais Aplicados

A arquitetura do sistema foi guiada por três características de qualidade principais e implementada com o auxílio de Design Patterns específicos.

### Características de Arquitetura Priorizadas

*   **Extensibilidade:** A capacidade de adicionar novos produtos de investimento e regras de negócio com o mínimo de impacto no sistema existente.
*   **Manutenibilidade:** A facilidade de corrigir, atualizar e entender o código, especialmente a lógica financeira que é crítica.
*   **Confiabilidade:** A garantia de que os cálculos são consistentes e precisos em toda a aplicação.

### Design Patterns Utilizados

*   **Strategy Pattern:** Utilizado para encapsular cada tipo de investimento (Tesouro Selic, CDB) como um "algoritmo" de cálculo intercambiável. Isso torna o sistema extremamente extensível.
*   **Singleton Pattern:** Aplicado no `TaxasService` para garantir um ponto de acesso único e global às taxas de mercado (SELIC, CDI), assegurando a consistência e confiabilidade dos dados em todos os cálculos.
*   **Factory Method (Simple Factory):** Usado para desacoplar o cliente da criação das estratégias. A `InvestimentoFactory` centraliza a lógica de negócio que decide quais produtos recomendar com base no valor investido, melhorando a manutenibilidade.

## 3. Tecnologias Utilizadas

*   Node.js

## 4. Estrutura do Projeto

O projeto foi organizado em módulos com responsabilidades bem definidas, visando alta coesão e baixo acoplamento.

/MeuInvest
|-- src/
| |-- services/
| | |-- TaxasService.js # (Singleton) Fornece taxas de mercado.
| |-- strategies/
| | |-- EstrategiaInvestimento.js # (Strategy) Interface base.
| | |-- TesouroSelicStrategy.js # Estratégia concreta.
| | |-- CDBStrategy.js # Estratégia concreta.
| | |-- PromocionalCDBStrategy.js # Estratégia concreta com regra especial.
| |-- factories/
| | |-- InvestimentoFactory.js # (Factory) Cria as estratégias.
|-- index.js # Ponto de entrada da aplicação (Cliente).
|-- package.json
|-- README.md

## 5. Como Executar o Projeto

Para executar o protótipo em seu ambiente local, siga os passos:

1.  Clone o repositório:
    ```bash
    git clone https://github.com/AlisonCarv/MeuInvest.git
    ```

2.  Navegue até o diretório do projeto:
    ```bash
    cd MeuInvest
    ```

3.  Execute o programa:
    ```bash
    node index.js
    ```
    O terminal se tornará interativo e solicitará os dados para a simulação.

### Exemplo de Uso

```console
> node index.js
--- MeuInvest: Consultor de Investimentos Inteligente ---
Qual valor você deseja investir? (ex: 10000): 4000
Por quantos anos? (ex: 4): 4

=================================================
Buscando recomendações para R$ 4000.00 por 4 ano(s)...
=================================================

Opções encontradas:

--- Tesouro Selic: Título público de baixo risco, com rendimento atrelado à taxa SELIC. ---
  - Rendimento Bruto: R$ 2971.72
  - Alíquota de IR: 15.0%
  - Imposto de Renda: R$ 445.76
  - Rendimento Líquido: R$ 2525.96
  - Montante Final: R$ 6525.96


--- CDB 110% do CDI: Título privado com rendimento atrelado à taxa CDI. ---
  - Rendimento Bruto: R$ 3340.45
  - Alíquota de IR: 15.0%
  - Imposto de Renda: R$ 501.07
  - Rendimento Líquido: R$ 2839.38
  - Montante Final: R$ 6839.38


--- CDB 120% do CDI (Promocional): Oferta para investimentos de até R$ 5.000,00. ---
  - Rendimento Bruto: R$ 3723.61
  - Alíquota de IR: 15.0%
  - Imposto de Renda: R$ 558.54
  - Rendimento Líquido: R$ 3165.07
  - Montante Final: R$ 7165.07