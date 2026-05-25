class TarefaModel {
  constructor() {
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
    const novoId =
      this.tarefas.length > 0
        ? this.tarefas[this.tarefas.length - 1].id + 1
        : 1;
    const novaTarefa = { id: novoId, descricao, concluido: false };

    this.tarefas.push(novaTarefa);

    // Retornar 201 Created é uma boa prática ao criar um recurso
    return novaTarefa;
  }

  async buscarPorId(id) {
    console.log("Model: buscarPorId chamado");

    const tarefa = this.tarefas.find((t) => t.id === id);

    if (!tarefa) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    return tarefa;
  }

  async atualizar(id, dadosAtualizados) {
    console.log("Model: atualizar chamado");

    const index = this.tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    this.tarefas[index] = { ...this.tarefas[index], ...dadosAtualizados, id };

    return this.tarefas[index];
  }

  async alternarConcluido(id) {
    console.log("Model: alternarConcluido chamado");

    const index = this.tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    this.tarefas[index].concluido = !this.tarefas[index].concluido;

    return this.tarefas[index];
  }

  async remover(id) {
    console.log("Model: remover chamado");

    const index = this.tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    this.tarefas.splice(index, 1);

    return;
  }

  async resumo() {
    console.log("Model: resumo chamado");

    const total = this.tarefas.length;
    const concluidas = this.tarefas.filter((t) => t.concluido).length;
    const pendentes = total - concluidas;

    return {
      total,
      concluidas,
      pendentes,
    };
  }
}

export default new TarefaModel();
