function criarProduto(dados) {
    if (!dados.nome) {
        throw new Error('O nome do produto é obrigatório');
    }

    if (typeof dados.preco !== 'number' || dados.preco <= 0) {
        throw new Error('O preço deve ser um número maior que zero');
    }

    if (typeof dados.estoque !== 'number' || !Number.isInteger(dados.estoque) || dados.estoque < 0) {
        throw new Error('O estoque deve ser um número inteiro maior ou igual a zero');
    }

    return {
        nome: dados.nome,
        preco: dados.preco,
        estoque: dados.estoque
    };
}

const casosDeTeste = [
    {
        descricao: 'Produto válido',
        dados: { nome: 'Teclado', preco: 150.00, estoque: 10 }
    },
    {
        descricao: 'Produto sem nome',
        dados: { preco: 150.00, estoque: 10 }
    },
    {
        descricao: 'Produto com preço negativo',
        dados: { nome: 'Mouse', preco: -50, estoque: 5 }
    },
    {
        descricao: 'Produto com estoque decimal',
        dados: { nome: 'Monitor', preco: 1200, estoque: 1.5 }
    }
];

casosDeTeste.forEach(({ descricao, dados }) => {
    console.log(`Teste: ${descricao}`);
    try {
        const produto = criarProduto(dados);
        console.log('Sucesso:', produto);
    } catch (error) {
        console.error('Erro:', error.message);
    }
    console.log('---');
});
