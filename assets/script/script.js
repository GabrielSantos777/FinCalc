// Função para formatar um número como moeda brasileira (R$ 0,00)
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
  }).format(value);
}


// Adicione um ouvinte de eventos de entrada a cada campo de entrada
const inputs = document.querySelectorAll('input[type="text"]');
inputs.forEach(input => {
  input.addEventListener('input', function () {
      let value = this.value.replace(/\D/g, ''); // Remover caracteres não numéricos
      value = (parseFloat(value) / 100).toFixed(2); // Converter para número e dividir por 100 para ajustar os centavos
      this.value = formatCurrency(value);
  });
});


// Função para remover formatação de moeda e retornar um número
function unformatCurrency(value) {
  return parseFloat(value.replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '')) || 0;
}

document.getElementById("calcular").addEventListener("click", function () {
  const principal = unformatCurrency(document.getElementById("principal").value);
  const taxa = parseFloat(document.getElementById("taxa").value.replace(',', '.'));
  const mensal = unformatCurrency(document.getElementById("mensal").value);
  const periodo = parseFloat(document.getElementById("periodo").value.replace(',', '.'));
  const taxaType = document.getElementById("taxaType").value; // Tipo de Taxa de Juros (anual ou mensal)
  const periodoType = document.getElementById("periodoType").value; // Tipo de Período (anos ou meses)

  let taxaMensal = 0;
  if (taxaType === "anual") {
      taxaMensal = Math.pow(1 + taxa / 100, 1 / 12) - 1; // Conversão de taxa anual para mensal
  } else {
      taxaMensal = taxa / 100; // Taxa mensal diretamente
  }

  let montanteFinal = principal; // Incluindo o valor inicial no montante inicial
  let totalInvestido = principal;
  let totalJuros = 0;

  if (periodoType === "meses") {
      for (let i = 0; i < periodo; i++) {
          montanteFinal += (montanteFinal * taxaMensal) + mensal;
          totalInvestido += mensal;
      }
  } else if (periodoType === "anos") {
      const meses = periodo * 12;
      for (let i = 0; i < meses; i++) {
          montanteFinal += (montanteFinal * taxaMensal) + mensal;
          totalInvestido += mensal;
      }
  }

  totalJuros = montanteFinal - totalInvestido;

  document.getElementById("montanteFinal").textContent = formatCurrency(montanteFinal);
  document.getElementById("totalInvestido").textContent = formatCurrency(totalInvestido);
  document.getElementById("totalJuros").textContent = formatCurrency(totalJuros);
});

document.getElementById("limpar").addEventListener("click", function () {
  document.getElementById("principal").value = "";
  document.getElementById("taxa").value = "";
  document.getElementById("mensal").value = "";
  document.getElementById("periodo").value = "";
  document.getElementById("montanteFinal").textContent = "";
  document.getElementById("totalInvestido").textContent = "";
  document.getElementById("totalJuros").textContent = "";
});

// Função para formatar um número como porcentagem (0.00%)
function formatPercentage(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Função para remover formatação de porcentagem e retornar um número
function unformatPercentage(value) {
    return parseFloat(value.replace('%', '').replace(',', '.').replace(/[^\d.-]/g, '')) / 100 || 0;
}

// Adicione um ouvinte de eventos de entrada aos campos de taxa de juros
const taxaInput = document.getElementById("taxa");
taxaInput.addEventListener('input', function () {
    const value = this.value.endsWith('%') ? this.value : this.value + '%';
    this.value = value === '0%' ? '' : formatPercentage(unformatPercentage(value));
});

