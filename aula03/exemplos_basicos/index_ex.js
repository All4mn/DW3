import Fastify from 'fastify'

const server = Fastify({
  //logger: true
})

server.get('/', async(request, reply)=>{
  console.log("Requisição text recebida")
  reply.send("oi")
})

server.get('/json', async(request, reply)=>{
  console.log("Requisição json recebida")
  reply.send({nome:"Allan"})
})

server.get('/html', async(request, reply)=>{
  console.log("Requisição html recebida")
  reply.type("text/html").send("<h1>Olá, mundo!</h1>")
})

try {
  console.log("Servidor Rodando na porta 3000")
  await server.listen({ port: 3000 })
} catch (erro) {
  server.log.error(erro)
  process.exit(1)
}
