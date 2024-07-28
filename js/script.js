document.getElementById('btnAdicionarReceita').addEventListener('click', () => {
    const descricao = document.getElementById('descricao-receita').value;
    const mes = document.getElementById('sel-mes-receita').value;
    const valor = parseFloat(document.getElementById('valor-receita').value);
    if (descricao && mes && !isNaN(valor)) {
        adicionarLinha('tabela-receitas', descricao, mes, valor);
    }
});

document.getElementById('btnAdicionarDespesa').addEventListener('click', () => {
    const descricao = document.getElementById('descricao-despesa').value;
    const mes = document.getElementById('sel-mes-despesa').value;
    const valor = parseFloat(document.getElementById('valor-despesa').value);
    if (descricao && mes && !isNaN(valor)) {
        adicionarLinha('tabela-despesas', descricao, mes, valor);
    }
});

function adicionarLinha(tabelaId, descricao, mes, valor) {
    const tabela = document.getElementById(tabelaId);
    let linha = tabela.insertRow(-1);
    linha.insertCell(0).innerText = descricao;
    for (let i = 1; i <= 12; i++) {
        linha.insertCell(i).innerText = (mes.toLowerCase() === tabela.rows[0].cells[i].innerText.toLowerCase()) ? `R$ ${valor.toFixed(2)}` : 'R$ 0,00';
    }
}

document.getElementById('btnCalcularTotal').addEventListener('click', () => {
    calcularTotal();
});

function calcularTotal() {
    // Implementar o cálculo total aqui
}
