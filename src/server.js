import http from 'node:http'
// const http = require('http') padrão de importação CommonJS 

// Node é Stateful , salva em memoria , diferente Stateless - utiliza externos

// Cabeçalhos (Requisição, Response) -> metadados, informações adicionais, como o front-end deve interpretar 
const users = []

const server = http.createServer((request, response) => {
    const {method , url} = request

    if (method == 'GET' && url == '/users'){
        return response
            .setHeader('Content-type','application/json')
            .end(JSON.stringify(users))

    if (method == 'POST' && url == '/users'){
        users.push({
            id: 1,
            name: 'Vitor',
            email: 'vitor.vitor@gmail.com',
        })

        return response.writeHead(201).end()
    }
       
    return response.writeHead(404).end()
}})

server.listen(3333)