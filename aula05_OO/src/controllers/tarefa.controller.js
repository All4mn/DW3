import model from "../models/tarefa.model.js";

class TarefaControler {
  constructor() {
    this.model = model;
  }

  async listarTarefas(request, reply) {
    // LOG para indicar que a função foi chamada
    console.log("Controller: listarTarefas chamado");

    // request.query acessa os parâmetros passados na URL após o '?' (ex: ?busca=estudar)
    const { busca, concluido } = request.query;

    const resultado = await this.model.listar({ busca, concluido });

    return reply.send(resultado);
  }

  async listarPendentes(request, reply) {
    // LOG para indicar que a função foi chamada
    console.log("Controller: listarTarefas chamado");

    // request.query acessa os parâmetros passados na URL após o '?' (ex: ?busca=estudar)
    const { busca, concluido = false } = request.query;

    const resultado = await this.model.pendentes({ busca, concluido });

    return reply.send(resultado);
  }

  async criarTarefa(request, reply) {
    console.log("Controller: criarTarefas chamado");

    const { descricao } = request.body;

    const novaTarefa = await this.model.criar(descricao);

    return reply.status(201).send(novaTarefa);
  }

  async obterResumo(request, reply) {
    console.log("Controller: obterResumo chamado");

    const resultado = await this.model.resumo();

    return reply.send(resultado);
  }

  async obterTarefa(request, reply) {
    console.log("Controller: obterTarefa chamado");

    const id = Number(request.params.id);

    const tarefa = await this.model.buscarPorId(id);

    reply.send(tarefa);
  }

  async atualizarTarefa(request, reply) {
    console.log("Controler: atualizarTarefa chamado");

    const id = Number(request.params.id);
    const tarefaAtualizada = request.body;

    const tarefa = await this.model.atualizar(id, tarefaAtualizada);

    return reply.send(tarefa);
  }

  async concluirTarefa(request, reply) {
    console.log("Controler: concluirTarefa chamado");

    const id = Number(request.params.id);
    const tarefa = await this.model.alternarConcluido(id);
    return reply.send(tarefa);
  }

  async removerTarefa(request, reply) {
    console.log("Controler: removerTarefa chamado");

    const id = Number(request.params.id);
    await this.model.remover(id);

    // 204 No Content indica sucesso sem corpo de resposta
    return reply.status(204).send();
  }
}

export default new TarefaControler()
