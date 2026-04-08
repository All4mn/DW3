import { listarTarefas } from "../controllers/tarefa.controller.js";

export async function tarefaRoutes(server, options) {

  // ATENÇÃO À ORDEM DAS ROTAS: Rotas estáticas (como /resumo) devem
  // vir antes de rotas com parâmetros dinâmicos (como /:id) para evitar
  // que "resumo" seja interpretado como um :id pelo servidor.
  
  // ROTAS e PROCESSAMENTO das requisições relacionadas às tarefas.
  server.get("/", async (request, reply) => {
    
    // LOG para indicar que a rota foi chamada
    console.log("Routes: GET /tarefas chamada");

    listarTarefas(request,reply)
  });

  server.post("/", async (request, reply) => {
    const { descricao } = request.body;

    // Exercício 1: Validação de dados
    if (!descricao || descricao.trim() === "") {
      return reply.status(400).send({
        status: "error",
        message: "A descrição da tarefa é obrigatória",
      });
    }

    // Gerando um ID automaticamente no Backend
    const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1;
    const novaTarefa = { id: novoId, descricao, concluido: false };

    tarefas.push(novaTarefa);
    // Retornar 201 Created é uma boa prática ao criar um recurso
    return reply.status(201).send(novaTarefa);
  });
  
  // Exercício 4: Rota de Estatísticas/Resumo (GET)
  server.get("/resumo", async (request, reply) => {
    const total = tarefas.length;
    const concluidas = tarefas.filter((t) => t.concluido).length;
    const pendentes = total - concluidas;

    return reply.send({
      total,
      concluidas,
      pendentes,
    });
  });

  server.get("/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const tarefa = tarefas.find((t) => t.id === id);

    if (!tarefa) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    reply.send(tarefa);
  });

  server.patch("/:id", async (request, reply) => {
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
  });

  server.delete("/:id", async (request, reply) => {
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
  });

  // Exercício 2: Rota de "Toggle" Concluir (PATCH)
  server.patch("/:id/concluir", async (request, reply) => {
    const id = Number(request.params.id);
    const index = tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    tarefas[index].concluido = !tarefas[index].concluido;
    return reply.send(tarefas[index]);
  });


}
