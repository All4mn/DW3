import pool from "../../database/pool.js";

class TarefaRepository {
  async buscarTodos() {
    console.log("Repository: buscarTodos chamado");
    const resultado = await pool.query(
      `
      SELECT
      t.id,
      t.descricao,
      t.concluido,
      t.criada_em,
      t.projeto_id,
      p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p
      ON p.id = t.projeto_id
      ORDER BY t.id
    `);

    return resultado.rows;
  }

  async buscarPorId(id) {
    console.log("Repository: buscarPorId chamado");
    const resultado = await pool.query(
      `
        SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
        FROM tarefas t
        LEFT JOIN projetos p
        ON p.id = t.projeto_id
        WHERE t.id = $1
    `,
      [id],
    );

    return resultado.rows[0] ?? null;
  }

  async buscarPorDescricao(descricao) {
    console.log("Repository: buscarPorDescricao chamado");
    const resultado = await pool.query(
      `
      SELECT id, descricao, concluido, criada_em, projeto_id
      FROM tarefas
      WHERE LOWER(descricao) = LOWER($1)
    `,
      [descricao],
    );

    return resultado.rows[0] ?? null;
  }

  async salvar(tarefa) {
    console.log("Repository: salvar chamado");
    const resultado = await pool.query(
      `
      INSERT INTO tarefas (descricao, concluido, projeto_id)
      VALUES ($1, $2, $3)
      RETURNING id, descricao, concluido, criada_em, projeto_id
    `,
      [tarefa.descricao, tarefa.concluido, tarefa.projetoId],
    );

    return resultado.rows[0];
  }

  async atualizar(id, dadosAtualizados) {
    console.log("Repository: atualizar chamado");
    const tarefaAtual = await this.buscarPorId(id);

    if (!tarefaAtual) return null;

    // Mapeia projetoId para projeto_id se presente
    const { projetoId, ...outrosDados } = dadosAtualizados;
    const dadosMapeados = { ...outrosDados };
    if (projetoId !== undefined) {
      dadosMapeados.projeto_id = projetoId;
    }

    const tarefaFinal = {
      ...tarefaAtual,
      ...dadosMapeados,
      id: tarefaAtual.id,
    };

    const resultado = await pool.query(
      `
      UPDATE tarefas
      SET descricao = $1,
          concluido = $2,
          projeto_id = $3
      WHERE id = $4
      RETURNING id, descricao, concluido, criada_em, projeto_id
    `,
      [tarefaFinal.descricao, tarefaFinal.concluido, tarefaFinal.projeto_id, id],
    );

    return resultado.rows[0] ?? null;
  }

  async remover(id) {
    console.log("Repository: remover chamado");
    const resultado = await pool.query(
      `
      DELETE FROM tarefas
      WHERE id = $1
    `,
      [id],
    );

    return resultado.rowCount > 0;
  }

  async buscarPendentes() {
    console.log("Repository: buscarPendentes chamado");
    const resultado = await pool.query(`
      SELECT id, descricao, concluido, criada_em, projeto_id
      FROM tarefas
      WHERE concluido = false
      ORDER BY id
    `);

    return resultado.rows;
  }
}

export default TarefaRepository;
