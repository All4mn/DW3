import http from 'http'

http.createServer((req, res)=>{
    console.log("requisição")
    res.end("ola, tudo bem")}).listen(3000)
console.log("servidor rodando")