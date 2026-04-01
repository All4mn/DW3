import Fastify from 'fastify'
import cors from '@fastify/cors'


const server = Fastify({})
const PORT = 3000

// Registramos o plugin de CORS para permitir que qualquer origem acesse nossa API
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

// vetor simulando o banco de dados
const tarefas = [
  { id: 1, descricao: "Comprar leite", concluido: false},
  { id: 2, descricao: "Estudar Fastify", concluido: true},
  { id: 3, descricao: "Fazer exercícios", concluido: false}
]

// Função para iniciar o servidor. Usamos async/await para lidar com a natureza assíncrona do processo de inicialização do servidor.
const start = async () => {
  // O bloco try/catch é utilizado para lidar com possíveis erros que possam ocorrer durante a inicialização do servidor, como a porta já estar em uso. Se o servidor iniciar com sucesso, ele exibirá uma mensagem no console indicando que está rodando. Caso contrário, o erro será logado e o processo será encerrado com um código de saída 1, indicando que houve uma falha.
  try {
      await server.listen({port: PORT})
      console.log(`Servidor rodando em http://localhost:${PORT}`)
  } catch (erro) {
      console.error(erro)
      process.exit(1)
  }
}

// Servir HTML

//Exercicio 1
server.get('/tarefas', async(request, reply)=>{
  
  const { busca, concluido } = request.query
  let resultado = tarefas

  if (busca) {
    resultado = resultado.filter(t => t.descricao.toLowerCase().includes(busca.toLowerCase()))
  }
  if (concluido === 'true' || concluido === 'false') {
    const concluidoBool = concluido.toLowerCase() === 'true'
    resultado = resultado.filter(t => t.concluido === concluidoBool)
  }

  return reply.send(resultado)
  
})

//Exercicio 2
server.post('/tarefas', async(request, reply)=>{
  const tarefa = request.body
  // Gerando um ID automaticamente no Backend (simulando um Banco de Dados)
  if (!tarefa.descricao || typeof tarefa.descricao !== 'string' || tarefa.descricao.trim() === '') {
    return reply.status(400).send({ status: 'error', message: 'Descrição inválida' })
  }
  const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1
  const novaTarefa = { id: novoId, ...tarefa }

  tarefas.push(novaTarefa)

  // Devolver Status 201 é a prática mundial padrão indicando "Recurso Criado com Sucesso"
  return reply.status(201).send(novaTarefa)
})

// busca expecífica de uma tarefa pelo ID usando parâmetros de rota
server.get('/tarefas/:id', async (request, reply) => {
  // Parâmetros de rota puros extraídos da requisição
  // O conteúdo extraído de request.params é sempre do tipo string, mesmo que seja um número. Por isso, usamos Number() para converter o valor para um tipo numérico.
  const id = Number(request.params.id)

  // O método .find() percorre o array e retorna o primeiro item que satisfaz a condição. Se não encontrar, retorna undefined.
  const tarefa = tarefas.find(t => t.id === id)

  // Se a tarefa não for encontrada, retornamos um status 404 (Not Found) com uma mensagem de erro padronizada. O 'return' é crucial aqui para garantir que a função pare de executar após enviar a resposta.
  if (!tarefa) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  // Se a tarefa for encontrada, enviamos os detalhes da tarefa como resposta. O status padrão 200 (OK) é aplicado automaticamente.
  return reply.send(tarefa)
})

server.patch('/tarefas/:id', async (request, reply) => {
  // Extraímos o id de request.params e o convertendo para número, pois os parâmetros de rota são sempre strings.
  const id = Number(request.params.id)

  // Encontramos o índice da tarefa que corresponde ao ID fornecido. O método .findIndex() retorna o índice do primeiro elemento que satisfaz a condição, ou -1 se nenhum elemento for encontrado.
  const index = tarefas.findIndex(t => t.id === id)

  // Se o índice for -1, significa que a tarefa não foi encontrada, e respondemos com um status 404 (Not Found) e uma mensagem de erro. O 'return' é crucial para garantir que a função pare de executar após enviar a resposta.
  if (index === -1) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  // O objeto enviado no body da requisição contém as propriedades que queremos atualizar. Ele pode conter apenas um campo ou vários campos, dependendo do que o cliente deseja modificar.
  const tarefaAtualizada = request.body

  // Aqui usamos o Spread Operator "..." para criar um novo objeto que combina as propriedades antigas da tarefa (tarefas[index]) com as novas propriedades enviadas no body (tarefaAtualizada). O ID é mantido intacto para garantir que a tarefa continue sendo identificada corretamente.
  tarefas[index] = { ...tarefas[index], ...tarefaAtualizada, id }

  // Retornamos a tarefa atualizada como resposta. O status padrão 200 (OK) é aplicado automaticamente.
  return reply.send(tarefas[index])
})

//Exercicio 3
server.patch('/tarefas/:id/concluir', async (request, reply) => {
  const id = Number(request.params.id)
  const index = tarefas.findIndex(t => t.id === id)
  if (index === -1) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }
  tarefas[index].concluido = !tarefas[index].concluido
  return reply.send(tarefas[index])
})

//Exercicio 4
server.get('/tarefas/resumo', async (request, reply) => {
  const total = tarefas.length
  const concluidas = tarefas.filter(t => t.concluido).length
  const pendentes = total - concluidas
  
  return reply.send({ total, concluidas, pendentes: pendentes })
})

server.delete('/tarefas/:id', async (request, reply) => {

  // Extraímos o ID da tarefa a ser excluída a partir dos parâmetros de rota e o convertemos para número.
  const id = Number(request.params.id)
  // Encontramos o índice da tarefa que corresponde ao ID fornecido. O método .findIndex() retorna o índice do primeiro elemento que satisfaz a condição, ou -1 se nenhum elemento for encontrado.
  const index = tarefas.findIndex(t => t.id === id)

  // Se o índice for -1, significa que a tarefa não foi encontrada, e respondemos com um status 404 (Not Found) e uma mensagem de erro. O 'return' é crucial para garantir que a função pare de executar após enviar a resposta.
  if (index === -1) {
      return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  // O método .splice() é utilizado para remover um item do array. Ele recebe dois argumentos: o índice a partir do qual a remoção deve começar e o número de itens a serem removidos (neste caso, 1).
  tarefas.splice(index, 1)

  // Após a remoção, respondemos com um status 204 (No Content), indicando que a operação foi bem-sucedida, mas não há conteúdo para retornar.
  return reply.status(204).send()
})

server.setNotFoundHandler((request, reply) => {

  return reply.code(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.',
  })

})

// Chamamos a função start para iniciar o servidor
start() 