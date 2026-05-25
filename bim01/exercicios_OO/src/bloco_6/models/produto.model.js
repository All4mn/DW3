class ProdutoModel {
    #produtos
    #proximoId

    constructor() {
        this.#produtos = [
            { id: 1, nome: 'Mouse', preco: 50 },
            { id: 2, nome: 'Teclado', preco: 150 },
            { id: 3, nome: 'Monitor', preco: 800 }
        ]
        this.#proximoId = 4
    }

    findAll() {
        return this.#produtos
    }

    findById(id) {
        return this.#produtos.find(produto => produto.id === id)
    }

    create(dados) {
        const novoProduto = {
            id: this.#proximoId,
            nome: dados.nome,
            preco: dados.preco
        }
        this.#produtos.push(novoProduto)
        this.#proximoId++
        return novoProduto
    }

    delete(id) {
        const indice = this.#produtos.findIndex(produto => produto.id === id)
        if (indice === -1) {
            return false
        }
        this.#produtos.splice(indice, 1)
        return true
    }

    static validar(dados) {
        const erros = []

        if (!dados.nome || typeof dados.nome !== 'string' || dados.nome.trim() === '') {
            erros.push('Nome é obrigatório e não pode ser vazio.')
        }

        if (!dados.preco || typeof dados.preco !== 'number' || dados.preco <= 0) {
            erros.push('Preço é obrigatório e deve ser um número maior que 0.')
        }

        if (erros.length > 0) {
            return { valido: false, erros }
        }

        return { valido: true }
    }
}

export default ProdutoModel