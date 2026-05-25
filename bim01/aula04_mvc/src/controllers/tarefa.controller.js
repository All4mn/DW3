import { listar, criar, buscarPorId, atualizar, alternarConcluido, remover, resumo, pendentes } from "../models/tarefa.model.js";

// Processa requisições da rota `GET /tarefas`
export async function listarTarefas(request, reply) {
  // LOG para indicar que a função foi chamada
  console.log("Controller: listarTarefas chamado");

  // request.query acessa os parâmetros passados na URL após o '?' (ex: ?busca=estudar)
  const {busca, concluido} = request.query;

  const resultado = await listar ({busca,concluido})

  return reply.send(resultado);
}

export async function listarPendentes(request, reply) {
  // LOG para indicar que a função foi chamada
  console.log("Controller: listarTarefas chamado");

  // request.query acessa os parâmetros passados na URL após o '?' (ex: ?busca=estudar)
  const {busca, concluido = false} = request.query;

  const resultado = await pendentes ({busca,concluido})

  return reply.send(resultado);
}

// Processa requisições da rota `POST /tarefas`
export async function criarTarefa(request, reply) {
  console.log("Controller: criarTarefas chamado");

  const { descricao } = request.body;
  
  const novaTarefa = await criar(descricao)
  
  return reply.status(201).send(novaTarefa);
}

// Processa requisições da rota `GET /tarefas/resumo`
export async function obterResumo(request, reply) {
    console.log("Controller: obterResumo chamado");

    const resultado = await resumo()

    return reply.send(resultado);
}

// Processa requisições da rota `GET /tarefas/:id`
export async function obterTarefa(request, reply) {
    console.log("Controller: obterTarefa chamado")

    const id = Number(request.params.id);

    const tarefa = await buscarPorId(id)

    reply.send(tarefa);
}

// Processa requisições da rota `PATCH /tarefas/:id`
export async function atualizarTarefa(request, reply) {
    console.log("Controler: atualizarTarefa chamado")
    
    const id = Number(request.params.id);
    const tarefaAtualizada = request.body;

    const tarefa = await atualizar(id, tarefaAtualizada)

    return reply.send(tarefa);
}

// Processa requisições da rota `PATCH /tarefas/:id/concluir`
export async function concluirTarefa(request, reply) {
    console.log("Controler: concluirTarefa chamado")

    const id = Number(request.params.id);
    const tarefa = await alternarConcluido(id)
    return reply.send(tarefa);
}

// Processa requisições da rota `DELETE /tarefas/:id`
export async function removerTarefa(request, reply) {
    console.log("Controler: removerTarefa chamado")

    const id = Number(request.params.id);
    await remover(id)

    // 204 No Content indica sucesso sem corpo de resposta
    return reply.status(204).send();
}
