// ler pequenas partes de alguma coisa e ja trabalhar com os dados antes de trabalhar com  o arquivo por completo

// aplicar no servidor enquanto os dados ainda estão com upload feito

// existem as streams Readable / Writable streams Request e Responses aos poucos 

// Envio esses dados aos poucos para serem tratados da maneira que precisa ser tratado da seguinte forma:

//process.stdin  || portas de entrada e saida, stdin e stdout, neste caso tudo que recebo como entrada eu encaminho como saida
//    .pipe(process.stdout)
import { Readable , Writable, Transform } from 'node:stream'

class InverseNumerStream extends Transform{
    _transform(chunck, encoding, callback){
        const transformed = Number(chunck.toString()) * -1

        callback(null, Buffer.from(String(transformed))) //Buffer serve para transicionar dados
    }
}

 class MultiplyByTenStream extends Writable {
    _write(chunck, encoding , callback){
            console.log(Number(chunck.toString()) * 10)
            callback()
    }
 }

class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100){ // push informa informação para quem estiver consumindo
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

new OneToHundredStream()
    .pipe(new InverseNumerStream())
    .pipe(new MultiplyByTenStream())