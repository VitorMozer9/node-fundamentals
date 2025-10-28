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

const server = createServer(async (request, response) => {
    //     .pipe(new InverseNumerStream())
    //     .pipe(response)

    const buffers = []

    for await (const chunck of request) { // Await, não deixa executar até que todos os dados estejam prontos

        buffers.push(chunck)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return response.end(fullStreamContent)
})

server.listen(3334)
