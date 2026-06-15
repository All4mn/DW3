import TarefaRepository from './tarefa.repository.js'
import TarefaService from './tarefa.service.js'
import TarefaController from './tarefa.controller.js'


export default async function tarefaRoutes(server) {
  const repository = new TarefaRepository()
  const service = new TarefaService(repository)
  const controller = new TarefaController(service)

  server.get('/', async (request, reply) => {
    console.log("Routes: GET / chamada")
    await controller.listarTarefas(request, reply)
  })

  server.post('/', async (request, reply) => {
    console.log("Routes: POST / chamada")
    await controller.criarTarefa(request, reply)
  })

  server.get('/:id', async (request, reply) => {
    console.log("Routes: GET /:id chamada")
    await controller.obterTarefa(request, reply)
  })

  server.patch('/:id', async (request, reply) => {
    console.log("Routes: PATCH /:id chamada")
    await controller.atualizarTarefa(request, reply)
  })

  server.patch('/:id/concluir', async (request, reply) => {
    console.log("Routes: PATCH /:id/concluir chamada")
    await controller.concluirTarefa(request, reply)
  })

  server.delete('/:id', async (request, reply) => {
    console.log("Routes: DELETE /:id chamada")
    await controller.removerTarefa(request, reply)
  })
}