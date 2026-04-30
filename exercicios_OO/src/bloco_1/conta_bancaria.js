class ContaBancaria{
    constructor(titular, saldo = 0) {
        this.titular = titular
        this.saldo = saldo
    }

    depositar(valor){
        this.saldo += valor
    }

    sacar(valor){
        if (valor > this.saldo){
            console.log("saldo insuficiente.")
            return
        }
        this.saldo -= valor
    }

    exibirSaldo(){
        console.log(`Titular: ${this.titular} | Saldo: R$ ${this.saldo}`)
    }
}

const titular1 = new ContaBancaria("Ana", 100);
const titular2 = new ContaBancaria("Carlos");

titular1.sacar(200)

titular1.depositar(50)
titular2.depositar(80)

titular1.exibirSaldo()
titular2.exibirSaldo()