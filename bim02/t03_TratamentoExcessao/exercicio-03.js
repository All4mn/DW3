class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

function criarProduto(dados) {
    if (!dados.nome) {
        throw new ValidationError('O nome do produto é obrigatório');
    }

    if (typeof dados.preco !== 'number' || dados.preco <= 0) {
        throw new ValidationError('O preço deve ser um número maior que zero');
    }

    if (typeof dados.estoque !== 'number' || !Number.isInteger(dados.estoque) || dados.estoque < 0) {
        throw new ValidationError('O estoque deve ser um número inteiro maior ou igual a zero');
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
        descricao: 'Simulação de Erro Inesperado',
        dados: null // Isso causará um erro de acesso a propriedade em dados.nome, que não é ValidationError
    }
];

casosDeTeste.forEach(({ descricao, dados }) => {
    console.log(`Teste: ${descricao}`);
    try {
        const produto = criarProduto(dados);
        console.log('Sucesso:', produto);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(`Erro de validação: ${error.message}`);
            // Verificação adicional solicitada nos critérios
            // console.log(`Nome do erro: ${error.name}`);
        } else {
            console.error(`Erro inesperado: ${error.message}`);
        }
    }
    console.log('---');
});
