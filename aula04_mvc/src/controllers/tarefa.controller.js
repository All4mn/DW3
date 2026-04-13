import { listar, criar, buscarPorId, atualizar, alternarConcluido, remover, resumo } from "../models/tarefa.model.js";

// Processa requisições da rota `GET /tarefas`
export async function listarTarefas(request, reply) {
  // LOG para indicar que a função foi chamada
  console.log("Controller: listarTarefas chamado");

  // request.query acessa os parâmetros passados na URL após o '?' (ex: ?busca=estudar)
  const {busca, concluido = false} = request.query;

  const resultado = await listar ({busca,concluido})

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

    const total = tarefas.length;
    const concluidas = tarefas.filter((t) => t.concluido).length;
    const pendentes = total - concluidas;

    return reply.send({
      total,
      concluidas,
      pendentes,
    });
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
    const index = tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    const tarefaAtualizada = request.body;
    tarefas[index] = { ...tarefas[index], ...tarefaAtualizada, id };

    return reply.send(tarefas[index]);
}

// Processa requisições da rota `PATCH /tarefas/:id/concluir`
export async function concluirTarefa(request, reply) {
    console.log("Controler: concluirTarefa chamado")

    const id = Number(request.params.id);
    const index = tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    tarefas[index].concluido = !tarefas[index].concluido;
    return reply.send(tarefas[index]);
}

// Processa requisições da rota `DELETE /tarefas/:id`
export async function removerTarefa(request, reply) {
    console.log("Controler: removerTarefa chamado")

    const id = Number(request.params.id);
    const index = tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    tarefas.splice(index, 1);
    // 204 No Content indica sucesso sem corpo de resposta
    return reply.status(204).send();
}
