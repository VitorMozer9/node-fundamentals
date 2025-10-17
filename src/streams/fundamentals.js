// ler pequenas partes de alguma coisa e ja trabalhar com os dados antes de trabalhar com  o arquivo por completo

// aplicar no servidor enquanto os dados ainda estão com upload feito

// existem as streams Readable / Writable streams Request e Responses aos poucos 

// Envio esses dados aos poucos para serem tratados da maneira que precisa ser tratado da seguinte forma:

//process.stdin  || portas de entrada e saida, stdin e stdout, neste caso tudo que recebo como entrada eu encaminho como saida
//    .pipe(process.stdout)
import { Readable } from 'node:stream'

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
    .pipe(process.stdout)