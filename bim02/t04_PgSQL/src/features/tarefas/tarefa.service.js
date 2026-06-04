// @file: src/services/tarefa.service.js

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
    if (!dados.titulo || dados.titulo.trim() === '') {
      throw new AppError('O título é obrigatório', 400)
    }

    const tarefas = await this.repository.listarTodos()
    const tituloJaExiste = tarefas.some(t => t.titulo.toLowerCase() === dados.titulo.toLowerCase().trim())

    if (tituloJaExiste) {
      throw new AppError('Já existe uma tarefa com esse título', 400)
    }

    return this.repository.salvar({ ...dados, status: 'pendente' })
  }

  async atualizar(id, dadosAtualizados) {
    console.log("Service: atualizar chamado")
    const tarefa = await this.buscarPorId(id) // Se não achar, o método acima já lança o AppError 404

    if (tarefa.status === 'concluida') {
      throw new AppError('Não é possível atualizar uma tarefa já concluída', 400)
    }

    return this.repository.atualizar(id, dados)
  }

  async alternarConcluido(id) {
    console.log("Service: alternarConcluido chamado")
    const tarefa = await this.buscarPorId(id)

    const novoStatus = tarefa.status === 'concluida' ? 'pendente' : 'concluida'
    return this.repository.atualizar(id, { status: novoStatus })
  }

  async remover(id) {
    console.log("Service: remover chamado")
    const tarefa = await this.buscarPorId(id)

    if (tarefa.status === 'concluida') {
      throw new AppError('Não é possível remover uma tarefa já concluída', 400)
    }

    return this.repository.remover(id)
  }

}

export default TarefaService