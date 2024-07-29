// Adiciona uma nova receita à tabela e atualiza os totais
document.getElementById('btnAdicionarReceita').addEventListener('click', () => {
    const descricao = document.getElementById('descricao-receita').value;
    const mes = document.getElementById('sel-mes-receita').value;
    const valor = parseFloat(document.getElementById('valor-receita').value);
    if (descricao && mes && !isNaN(valor)) {
        adicionarLinha('tabela-receitas', descricao, mes, valor);
        atualizarTotal('tabela-receitas', 'total-receitas');
        atualizarResultado();
    }
});

// Adiciona uma nova despesa à tabela e atualiza os totais
document.getElementById('btnAdicionarDespesa').addEventListener('click', () => {
    const descricao = document.getElementById('descricao-despesa').value;
    const mes = document.getElementById('sel-mes-despesa').value;
    const valor = parseFloat(document.getElementById('valor-despesa').value);
    if (descricao && mes && !isNaN(valor)) {
        adicionarLinha('tabela-despesas', descricao, mes, valor);
        atualizarTotal('tabela-despesas', 'total-despesas');
        atualizarResultado();
    }
});

function adicionarLinha(tabelaId, descricao, mes, valor) {
    const tabela = document.getElementById(tabelaId);
    let linha = tabela.insertRow(tabela.rows.length - 1);
    linha.insertCell(0).innerText = descricao;

    for (let i = 1; i <= 12; i++) {
        const mesAtual = tabela.rows[0].cells[i].innerText.toLowerCase();
        if (mes.toLowerCase() === mesAtual) {
            linha.insertCell(i).innerText = `R$ ${valor.toFixed(2)}`;
        } else {
            linha.insertCell(i).innerText = 'R$ 0,00';
        }
    }
}

document.getElementById('btnDeletarReceita').addEventListener('click', () => {
    deletarUltimaLinha('tabela-receitas', 'total-receitas');
});

document.getElementById('btnDeletarDespesa').addEventListener('click', () => {
    deletarUltimaLinha('tabela-despesas', 'total-despesas');
});

function deletarUltimaLinha(tabelaId, totalId) {
    const tabela = document.getElementById(tabelaId);
    if (tabela.rows.length > 2) { // Verifica se há mais de uma linha (além do cabeçalho e do total)
        tabela.deleteRow(tabela.rows.length - 2); // Deleta a penúltima linha (última linha de dados)
        atualizarTotal(tabelaId, totalId);
        atualizarResultado();
    }
}

function atualizarTotal(tabelaId, totalId) {
    const tabela = document.getElementById(tabelaId);
    let total = document.getElementById(totalId);

    if (!total) {
        total = tabela.insertRow(-1);
        total.id = totalId;
        total.insertCell(0).innerText = 'Total';
        for (let i = 1; i <= 12; i++) {
            total.insertCell(i).innerText = 'R$ 0,00';
        }
    }

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

function atualizarResultado() {
    const totalReceitas = document.getElementById('total-receitas');
    const totalDespesas = document.getElementById('total-despesas');
    const totalResultado = document.getElementById('total-resultado');

    for (let i = 1; i <= 12; i++) {
        const receitas = parseFloat(totalReceitas.cells[i].innerText.replace('R$ ', '').replace(',', '.')) || 0;
        const despesas = parseFloat(totalDespesas.cells[i].innerText.replace('R$ ', '').replace(',', '.')) || 0;
        const saldo = receitas - despesas;
        totalResultado.cells[i].innerText = `R$ ${saldo.toFixed(2)}`;
        totalResultado.cells[i].classList.add('total-resultado-cell');
    }
}
