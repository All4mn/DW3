class Produto{
    constructor(nome, preco, estoque){
        this.nome = nome
        this.preco = preco
        this.estoque = estoque
    }

    disponivel(){
        if(this.estoque > 0) return true
        false
    }

    exibir(){
        const disponivel = this.disponivel()?"Em estoque":"Fora de estoque"
        console.log(`${this.nome} - R$ ${this.preco} - ${disponivel}`)
    }
}

const produto1 = new Produto("Notebook", 3500, 5)
const produto2 = new Produto("Tablet", 1500, 0)

produto1.exibir()
produto2.exibir()