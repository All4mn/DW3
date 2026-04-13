// DADOS utilizados pelas requisições relacionadas às tarefas.
const tarefas = [
  { id: 1, descricao: "Fazer compras", concluido: false },
  { id: 2, descricao: "Lavar o carro", concluido: false },
  { id: 3, descricao: "Estudar Fastify", concluido: true },
  { id: 4, descricao: "Estudar JavaScript", concluido: true },
];

// Função para listar todas as tarefas. Ela pode receber opções de filtro, como busca por descrição ou filtro por status de conclusão.
export async function listar(opcoes) {
  console.log("Model: listar chamado");

  const { busca, concluido } = opcoes;

  // código movido do controlador para o modelo
  // ---------------------------------------------
  let resultado = tarefas;
  if (busca) {
    resultado = resultado.filter((t) =>
      t.descricao.toLowerCase().includes(busca.toLowerCase()),
    );
  }
  if (concluido !== undefined) {
    const concluidoBool = concluido === "true";
    resultado = resultado.filter((t) => t.concluido === concluidoBool);
  }
  // ---------------------------------------------

  return resultado;
}

// Função para criar uma nova tarefa. Ela recebe a descrição da tarefa como parâmetro e retorna a tarefa criada.
export async function criar(descricao) {
    console.log("Model: criar chamado");

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
  return novaTarefa;
}

// Função para obter os detalhes de uma tarefa específica. Ela recebe o ID da tarefa como parâmetro e retorna a tarefa correspondente.
export async function buscarPorId(id) {
    console.log("Model: buscarPorId chamado");

    const tarefa = tarefas.find((t) => t.id === id);

    if (!tarefa) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    return tarefa
}

// Função para atualizar uma tarefa existente. Ela recebe o ID da tarefa e os dados atualizados como parâmetros, e retorna a tarefa atualizada.
export async function atualizar(id, dadosAtualizados) {}

// Função para alternar o status de conclusão de uma tarefa. Ela recebe o ID da tarefa como parâmetro.
export async function alternarConcluido(id) {}

// Função para remover uma tarefa. Ela recebe o ID da tarefa como parâmetro.
export async function remover(id) {}

// Função para obter o resumo das tarefas (quantas estão pendentes, quantas estão concluídas).
export async function resumo() {}
