
class TarefaModel {
  constructor(){
    this.tarefas = [
      { id: 1, descricao: "Fazer compras", concluido: false },
      { id: 2, descricao: "Lavar o carro", concluido: false },
      { id: 3, descricao: "Estudar Fastify", concluido: true },
      { id: 4, descricao: "Estudar JavaScript", concluido: true },
    ];
  }

  async listar(opcoes) {
    console.log("Model: listar chamado");
  
    const { busca, concluido } = opcoes;

    let resultado = this.tarefas;
    if (busca) {
      resultado = resultado.filter((t) =>
        t.descricao.toLowerCase().includes(busca.toLowerCase()),
      );
    }
    if (concluido !== undefined) {
      const concluidoBool = concluido === "true";
      resultado = resultado.filter((t) => t.concluido === concluidoBool);
    }
  
    return resultado;
  }

  async pendentes(opcoes) {
    console.log("Model: listar chamado");
  
    const { busca, concluido } = opcoes;
  
    let resultado = this.tarefas;
    if (busca) {
      resultado = resultado.filter((t) =>
        t.descricao.toLowerCase().includes(busca.toLowerCase()),
      );
    }
    if (concluido !== undefined) {
      const concluidoBool = concluido === "true";
      resultado = resultado.filter((t) => t.concluido === concluidoBool);
    }
  
    return resultado;
  }


  async criar(descricao) {
    console.log("Model: criar chamado");
  
    if (!descricao || descricao.trim() === "") {
      return reply.status(400).send({
        status: "error",
        message: "A descrição da tarefa é obrigatória",
      });
    }
  
    // Gerando um ID automaticamente no Backend
    const novoId = this.tarefas.length > 0 ? this.tarefas[this.tarefas.length - 1].id + 1 : 1;
    const novaTarefa = { id: novoId, descricao, concluido: false };
  
    this.tarefas.push(novaTarefa);
  
    // Retornar 201 Created é uma boa prática ao criar um recurso
    return novaTarefa;
  }

  //continuar -----------------------------------------------
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

  return tarefa;
}

// Função para atualizar uma tarefa existente. Ela recebe o ID da tarefa e os dados atualizados como parâmetros, e retorna a tarefa atualizada.
export async function atualizar(id, dadosAtualizados) {
  console.log("Model: atualizar chamado");

  const index = tarefas.findIndex((t) => t.id === id);

  if (index === -1) {
    return reply
      .status(404)
      .send({ status: "error", message: "Tarefa não encontrada" });
  }

  tarefas[index] = { ...tarefas[index], ...dadosAtualizados, id };

  return tarefas[index];
}

// Função para alternar o status de conclusão de uma tarefa. Ela recebe o ID da tarefa como parâmetro.
export async function alternarConcluido(id) {
  console.log("Model: alternarConcluido chamado");

  const index = tarefas.findIndex((t) => t.id === id);

  if (index === -1) {
    return reply
      .status(404)
      .send({ status: "error", message: "Tarefa não encontrada" });
  }

  tarefas[index].concluido = !tarefas[index].concluido;

  return tarefas[index];
}

// Função para remover uma tarefa. Ela recebe o ID da tarefa como parâmetro.
export async function remover(id) {
  console.log("Model: remover chamado");

  const index = tarefas.findIndex((t) => t.id === id);

  if (index === -1) {
    return reply
      .status(404)
      .send({ status: "error", message: "Tarefa não encontrada" });
  }

  tarefas.splice(index, 1);

  return;
}

// Função para obter o resumo das tarefas (quantas estão pendentes, quantas estão concluídas).
export async function resumo() {
  console.log("Model: resumo chamado");

  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.concluido).length;
  const pendentes = total - concluidas;

  return {
    total,
    concluidas,
    pendentes,
  };
}
