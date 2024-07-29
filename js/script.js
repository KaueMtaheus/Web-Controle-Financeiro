// Adiciona uma nova receita à tabela e atualiza os totais
document.getElementById('btnAdicionarReceita').addEventListener('click', () => {
   // Pega os valores de descrição, mês e valor da receita
    const descricao = document.getElementById('descricao-receita').value;
    const mes = document.getElementById('sel-mes-receita').value;
    const valor = parseFloat(document.getElementById('valor-receita').value);
    
    // Verifica se os campos foram preenchidos corretamente
    if (descricao && mes && !isNaN(valor)) {
        
         // Adiciona a receita à tabela e atualiza os totais
        adicionarLinha('tabela-receitas', descricao, mes, valor);
        atualizarTotal('tabela-receitas', 'total-receitas');
        atualizarResultado();
    }
});

     // Adiciona uma nova despesa à tabela e atualiza os totais
document.getElementById('btnAdicionarDespesa').addEventListener('click', () => {

    // Obtém valores dos campos de entrada
    const descricao = document.getElementById('descricao-despesa').value;
    const mes = document.getElementById('sel-mes-despesa').value;
    const valor = parseFloat(document.getElementById('valor-despesa').value);
   
     // Verifica se os campos são válidos
    if (descricao && mes && !isNaN(valor)) {
       
        // Adiciona a despesa à tabela e atualiza os totais
        adicionarLinha('tabela-despesas', descricao, mes, valor);
        atualizarTotal('tabela-despesas', 'total-despesas');
        atualizarResultado();
    }
});


// Função para adicionar uma nova linha na tabela
function adicionarLinha(tabelaId, descricao, mes, valor) {
    const tabela = document.getElementById(tabelaId);
    
    // Insere uma nova linha com os valores informados
    let linha = tabela.insertRow(tabela.rows.length - 1);
    linha.insertCell(0).innerText = descricao;


    // Insere o valor no mês correspondente
    for (let i = 1; i <= 12; i++) {
        const mesAtual = tabela.rows[0].cells[i].innerText.toLowerCase();
        if (mes.toLowerCase() === mesAtual) {
            linha.insertCell(i).innerText = `R$ ${valor.toFixed(2)}`;
        } else {
            linha.insertCell(i).innerText = 'R$ 0,00';
        }
    }
}


// Remove a última linha de receitas
document.getElementById('btnDeletarReceita').addEventListener('click', () => {
    deletarUltimaLinha('tabela-receitas', 'total-receitas');
});


// Remove a última linha de despesas
document.getElementById('btnDeletarDespesa').addEventListener('click', () => {
    deletarUltimaLinha('tabela-despesas', 'total-despesas');
});



// Função para deletar a última linha da tabela
function deletarUltimaLinha(tabelaId, totalId) {
    const tabela = document.getElementById(tabelaId);
    if (tabela.rows.length > 2) { // Verifica se há mais de uma linha (além do cabeçalho e do total)
        tabela.deleteRow(tabela.rows.length - 2); // Deleta a penúltima linha (última linha de dados)
        atualizarTotal(tabelaId, totalId);
        atualizarResultado();
    }
}


// Função para atualizar o total de receitas ou despesas
function atualizarTotal(tabelaId, totalId) {
    const tabela = document.getElementById(tabelaId);
    let total = document.getElementById(totalId);

    // Cria a linha de total se não existir
    if (!total) {
        total = tabela.insertRow(-1);
        total.id = totalId;
        total.insertCell(0).innerText = 'Total';
        for (let i = 1; i <= 12; i++) {
            total.insertCell(i).innerText = 'R$ 0,00';
        }
    }


     // Calcula e exibe o total para cada mês
    for (let i = 1; i <= 12; i++) {
        let soma = 0;
        for (let j = 1; j < tabela.rows.length - 1; j++) {
            const valor = parseFloat(tabela.rows[j].cells[i].innerText.replace('R$ ', '').replace(',', '.'));
            soma += !isNaN(valor) ? valor : 0;
        }
        total.cells[i].innerText = `R$ ${soma.toFixed(2)}`;
        if (totalId === 'total-receitas') {
            total.cells[i].classList.add('total-receitas-cell');
        } else if (totalId === 'total-despesas') {
            total.cells[i].classList.add('total-despesas-cell');
        }
    }
}

// Atualiza o resultado final (saldo entre receitas e despesas)
function atualizarResultado() {
    const totalReceitas = document.getElementById('total-receitas');
    const totalDespesas = document.getElementById('total-despesas');
    const totalResultado = document.getElementById('total-resultado');

        // Calcula o saldo para cada mês
    for (let i = 1; i <= 12; i++) {
        const receitas = parseFloat(totalReceitas.cells[i].innerText.replace('R$ ', '').replace(',', '.')) || 0;
        const despesas = parseFloat(totalDespesas.cells[i].innerText.replace('R$ ', '').replace(',', '.')) || 0;
        const saldo = receitas - despesas;
        totalResultado.cells[i].innerText = `R$ ${saldo.toFixed(2)}`;
        totalResultado.cells[i].classList.add('total-resultado-cell');
    }
}
