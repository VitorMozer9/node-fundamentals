import http from 'node:http'
// const http = require('http') padrão de importação CommonJS 

// Node é Stateful , salva em memoria , diferente Stateless - utiliza externos

// Cabeçalhos (Requisição, Response) -> metadados, informações adicionais, como o front-end deve interpretar 
const users = []
//usou await tem que transofrmar a função em assincrona(segundo plano)
const server = http.createServer(async(request, response) => {
    const {method , url} = request

    const buffers = []

    for await (const chunck of request) { 
        buffers.push(chunck)
    }

    try{
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        request.body = null    
    }

    if (method == 'GET' && url == '/users'){

        return response
            .setHeader('Content-type','application/json')
            .end(JSON.stringify(users))
    }

    if (method == 'POST' && url == '/users'){

         const { name, email } = request.body

        users.push({
            id: 1,
            name,
            email, 
        })

        // users.push({
        //     id: 1,
        //     name: "teste",
        //     email: "teste",
        // })

        return response.writeHead(201).end()
    }
       
    return response.writeHead(404).end()
})

server.listen(3333)