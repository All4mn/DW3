class FilaAtendimento {
    constructor() {
        this._fila = []
        this.contador = 1
    }

    entrar(nome) {
        const senha = this.contador
        this._fila.push({ senha, nome })
        this.contador += 1
        console.log(`Senha ${senha} gerada para ${nome}.`)
    }

    chamarProximo() {
        if (this._fila.length === 0) {
            console.log("Fila vazia.")
            return null
        }

        const proximo = this._fila.shift()
        console.log(`Chamando senha ${proximo.senha} — ${proximo.nome}`)
        return proximo
    }

    tamanho() {
        console.log(`Pessoas na fila: ${this._fila.length}`) 
    }
}

const fila = new FilaAtendimento()
fila.entrar("Ana")
fila.entrar("Bruno")
fila.entrar("Carla")

fila.chamarProximo()
fila.chamarProximo()

fila.tamanho()