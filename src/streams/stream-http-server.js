import http, { createServer } from 'node:http'
import { Transform } from 'node:stream'

class InverseNumerStream extends Transform{
    _transform(chunck, encoding, callback){
        const transformed = Number(chunck.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed))) //Buffer serve para transicionar dados
    }
}

// request => ReadableStream
// response => WritableStream

const server = createServer((request, response) => {
    //return response.end('My first server in node, i make the const server, who recives request and response, and have a return ')
    return request
        .pipe(new InverseNumerStream())
        .pipe(response)
})

server.listen(3334)