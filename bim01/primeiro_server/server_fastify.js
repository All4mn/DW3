// Importa a função de fábrica do Fastify do pacote fastify
import Fastify from 'fastify'

// Cria uma instância de servidor Fastify e ativa o log interno (saída no console)
const server = Fastify({
  logger: true
})

// Declara uma rota que responde a requisições HTTP GET no caminho '/'
server.get('/', async function handler (request, reply) {
  // O valor retornado é convertido para JSON e enviado como corpo da resposta
  reply.send({ hello: 'world' })
})

// Inicia o servidor e faz ele escutar na porta 3000
try {
  await server.listen({ port: 3000 })
} catch (err) {
  // Caso o servidor não consiga iniciar, registra o erro e encerra o processo
  server.log.error(err)
  process.exit(1)
}
