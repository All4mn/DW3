class Timer{
  constructor(nome) {
    this.nome = nome
    this.segundos = 0
  }

  iniciar() {
    setInterval(() => {
      this.segundos++
      console.log(`${this.nome}: ${this.segundos}s`)
    }, 1000)
  }
}

const t = new Timer('Cronômetro')
t.iniciar()

// -----------------------

// 1. O erro é que 'this.segundos' e 'this.nome' são undefined porque o 'this' dentro da função anônima não se refere à instância da classe. Isso acontece porque funções regulares têm seu próprio contexto 'this'.

// 2. Correção: Substituir 'function()' por '() =>' (arrow function).

// 3. Arrow functions não têm seu próprio 'this'; elas herdam o 'this' do escopo léxico onde foram definidas. No caso, o 'this' dentro da arrow function se refere ao 'this' da classe.