import controler from "../controllers/tarefa.controller.js";

export async function tarefaRoutes(server, options) {
  // ATENÇÃO À ORDEM DAS ROTAS: Rotas estáticas (como /resumo) devem
  // vir antes de rotas com parâmetros dinâmicos (como /:id) para evitar
  // que "resumo" seja interpretado como um :id pelo servidor.

  server.get("/", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: GET /tarefas chamada");

    controler.listarTarefas(request, reply);
  });

  server.get("/pendentes", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: GET /pendentes chamada");

    controler.listarPendentes(request, reply);
  });

  server.post("/", async (request, reply) => {
    console.log("Routes: POST /tarefas chamada");
    controler.criarTarefa(request, reply);
  });

  server.get("/resumo", async (request, reply) => {
    console.log("Routes: GET /resumo chamada");
    controler.obterResumo(request, reply);
  });

  server.get("/:id", async (request, reply) => {
    console.log("Routes: GET /:id chamado");
    controler.obterTarefa(request, reply);
  });

  server.patch("/:id", async (request, reply) => {
    console.log("Routes: PATCH /:id chamado");
    controler.atualizarTarefa(request, reply);
  });

  server.patch("/:id/concluir", async (request, reply) => {
    console.log("Routes: PATCH /:id/concluir chamado");
    controler.concluirTarefa(request, reply);
  });

  server.delete("/:id", async (request, reply) => {
    console.log("Routes: DELETE /:id chamado");
    controler.removerTarefa(request, reply);
  });
}
