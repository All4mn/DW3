class Aluno {
    constructor(nome) {
        this.nome = nome
        this.notas = []
    }

    adicionarNota(nota) {
        this.notas.push(nota)
    }

    calcularMedia() {
        if (this.notas.length === 0) {
            return 0
        }

        const soma = this.notas.reduce((total, nota) => total + nota, 0)
        return soma / this.notas.length
    }

    situacao() {
        return this.calcularMedia() >= 6 ? "Aprovado" : "Reprovado"
    }

    exibir() {
        const media = this.calcularMedia()
        console.log(`${this.nome} | Média: ${media.toFixed(2)} | ${this.situacao()}`)
    }
}

const aluno1 = new Aluno("Ana")
const aluno2 = new Aluno("Carlos")

aluno1.adicionarNota(7)
aluno1.adicionarNota(8)
aluno1.adicionarNota(6)

aluno2.exibir()
aluno1.exibir()