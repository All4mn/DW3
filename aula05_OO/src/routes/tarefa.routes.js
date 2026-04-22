import { atualizarTarefa, concluirTarefa, criarTarefa, listarTarefas, obterResumo, obterTarefa, removerTarefa, listarPendentes } from "../controllers/tarefa.controller.js";

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

  server.get("/pendentes", async (request, reply) => {
    
    // LOG para indicar que a rota foi chamada
    console.log("Routes: GET /pendentes chamada");

    listarPendentes(request,reply)
  });

  server.post("/", async (request, reply) => {

    console.log("Routes: POST /tarefas chamada");
    criarTarefa( request,reply)
  });
  
  // Exercício 4: Rota de Estatísticas/Resumo (GET)
  server.get("/resumo", async (request, reply) => {

    console.log("Routes: GET /resumo chamada");
    obterResumo(request,reply)
  });

  server.get("/:id", async (request, reply) => {

    console.log("Routes: GET /:id chamado")
    obterTarefa(request,reply)
  });

  server.patch("/:id", async (request, reply) => {

    console.log("Routes: PATCH /:id chamado")
    atualizarTarefa(request,reply)
  });

  // Exercício 2: Rota de "Toggle" Concluir (PATCH)
  server.patch("/:id/concluir", async (request, reply) => {

    console.log("Routes: PATCH /:id/concluir chamado")
    concluirTarefa(request,reply)
  });

  server.delete("/:id", async (request, reply) => {

    console.log("Routes: DELETE /:id chamado")
    removerTarefa(request,reply)
  });

}
