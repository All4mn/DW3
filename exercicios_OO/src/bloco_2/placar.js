class Placar {
    constructor(timeCasa, timeVisitante) {
        this.timeCasa = timeCasa
        this.timeVisitante = timeVisitante
        this.golsCasa = 0
        this.golsVisitante = 0
    }

    marcarGol(time) {
        if (time === this.timeCasa) {
            this.golsCasa += 1
            return
        }

        if (time === this.timeVisitante) {
            this.golsVisitante += 1
            return
        }

        console.log("Time inválido.")
    }

    exibir() {
        console.log(`${this.timeCasa} ${this.golsCasa} x ${this.golsVisitante} ${this.timeVisitante}`)
    }

    resultado() {
        let resultado = "Empate"
        if (this.golsCasa > this.golsVisitante) {
            resultado = `Vitória do ${this.timeCasa}`
        }

        if (this.golsVisitante > this.golsCasa) {
            resultado = `Vitória do ${this.timeVisitante}`
        }

        console.log(resultado) 
    }
}

const placar = new Placar("Flamengo", "Vasco")
placar.marcarGol("Flamengo")
placar.marcarGol("Vasco")
placar.marcarGol("Flamengo")
placar.marcarGol("Santos")
placar.exibir()
placar.resultado()