import { AppError } from '../../errors/appError.js'

class TarefaService {
  constructor(repository) {
    this.repository = repository
  }

  async listar(opcoes) {
    console.log("Service: listar chamado")
    const { busca, concluido } = opcoes

    let resultado = await this.repository.buscarTodos()

    if (busca) {
      resultado = resultado.filter(t =>
        t.descricao.toLowerCase().includes(busca.toLowerCase())
      )
    }

    if (concluido !== undefined) {
      const concluidoBool = concluido === 'true'
      resultado = resultado.filter(t => t.concluido === concluidoBool)
    }

    return resultado
  }

  async buscarPorId(id) {
    console.log("Service: buscarPorId chamado")
    const tarefa = await this.repository.buscarPorId(id)
    if (!tarefa) {
      // 404: Not Found (Não Encontrado)
      throw new AppError('Tarefa não encontrada', 404)
    }
    return tarefa
  }

  async criar(descricao) {
    if (!descricao || descricao.trim() === '') {
      throw new AppError('A descrição é obrigatória', 400)
    }

    const jaExiste = await this.repository.buscarPorDescricao(descricao.trim())

    if (jaExiste) {
      throw new AppError('Já existe uma tarefa com essa descrição', 400)
    }

    return this.repository.salvar({ descricao, concluido: false })
  }

  async atualizar(id, dadosAtualizados) {
    console.log("Service: atualizar chamado")
    const tarefa = await this.buscarPorId(id)

    if (tarefa.concluido) {
      throw new AppError('Não é possível atualizar uma tarefa já concluída', 400)
    }

    return this.repository.atualizar(id, dadosAtualizados)
  }

  async alternarConcluido(id) {
    console.log("Service: alternarConcluido chamado")
    const tarefa = await this.buscarPorId(id)

    const novoEstado = !tarefa.concluido
    return this.repository.atualizar(id, { concluido: novoEstado })
  }

  async remover(id) {
    console.log("Service: remover chamado")
    const tarefa = await this.buscarPorId(id)

    if (tarefa.concluido) {
      throw new AppError('Não é possível remover uma tarefa já concluída', 400)
    }

    return this.repository.remover(id)
  }

}

export default TarefaService