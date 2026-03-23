import Fastify from 'fastify'

const server = Fastify({})

// vetor simulando o banco de dados
const tarefas = [
  { id: 1, descricao: "Comprar leite"},
  { id: 2, descricao: "Estudar Fastify"},
  { id: 3, descricao: "Fazer exercícios"}
]

server.get('/tarefas', async(request, reply)=>{
  reply.send(tarefas)
})

server.post('/tarefas', async(request, reply)=>{
  const tarefa = request.body
  tarefas.push(tarefa)
  reply.send({ status: "sucesso", message: "Tarefa adicionada com sucesso" })
})

try {
  console.log("Servidor Rodando na porta 3000")
  await server.listen({ port: 3000 })
} catch (erro) {
  server.log.error(erro)
  process.exit(1)
}
