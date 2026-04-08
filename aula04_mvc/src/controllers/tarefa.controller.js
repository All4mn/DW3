    
    // DADOS utilizados pelas requisições relacionadas às tarefas.
    const tarefas = [
        { id: 1, descricao: "Fazer compras", concluido: false },
        { id: 2, descricao: "Lavar o carro", concluido: false },
        { id: 3, descricao: "Estudar Fastify", concluido: true },
        { id: 4, descricao: "Estudar JavaScript", concluido: true },
      ];

    // Processa requisições da rota `GET /tarefas`
    export async function listarTarefas(request, reply) { 

        // LOG para indicar que a função foi chamada
        console.log("Controller: listarTarefas chamado")

        // request.query acessa os parâmetros passados na URL após o '?' (ex: ?busca=estudar)
        const busca = request.query.busca;

        if (busca) {
            // Filtra as tarefas garantindo a busca correta independente de maiúsculas/minúsculas
            const tarefasFiltradas = tarefas.filter((t) =>
            t.descricao.toLowerCase().includes(busca.toLowerCase()),
            );
            return reply.send(tarefasFiltradas);
        }

        return reply.send(tarefas);

    }

    // Processa requisições da rota `POST /tarefas`
    export async function criarTarefa(request, reply) { }

    // Processa requisições da rota `GET /tarefas/resumo`
    export async function obterResumo(request, reply) { }

    // Processa requisições da rota `GET /tarefas/:id`
    export async function obterTarefa(request, reply) { }

    // Processa requisições da rota `PATCH /tarefas/:id`
    export async function atualizarTarefa(request, reply) { }

    // Processa requisições da rota `PATCH /tarefas/:id/concluir`
    export async function concluirTarefa(request, reply) { }

    // Processa requisições da rota `DELETE /tarefas/:id`
    export async function removerTarefa(request, reply) { }