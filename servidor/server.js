
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: true}))

app.post('/metroProject/horas', (req, resp) => {
    let horasReceived = req.body.horas
    let minutosReceived = req.body.minutos

    const metro = (hora, minutos) => {
        if ((hora > 24 || hora < 0 || minutos < 0 || minutos > 59))
            return "HORA INVALIDA, insira na ordem (hora, minuto)"
    
        // Variaveis e constantes
        const stepHours = 1
        const startHours = 6
        const endHours = 19
        const resultado = []
        
        //Objeto principal
        const info = {
            ceilandia: {
                horas: [],
                minutos: [00]
            },
            samambaia: {
                horas:[],
                minutos:[00]
            }
        }
      
        // Definindo horarios de funcionamento (06AM - 20h)
        {
        //HORA de funcionamento
        const metroHoras = (min, max, step) => {
            for (let i = min; i <= max; i += step) {
                info.ceilandia.horas.push(i)
                info.samambaia.horas.push(i)
            }
            // info.ceilandia.horas.push(info.ceilandia.horas.length+2)
        }
        metroHoras(startHours, endHours, stepHours)
    
        //MINUTOS que o metro de CEILANDIA passa
        const CEIminutos = (min, max, step) => {
            for (i = min; i <= max; i += step)
                {info.ceilandia.minutos.push(i)}
        }
        CEIminutos(20, 59, 20)
    
        //MINUTOS que o metro de SAMAMBAIA passa
        const SAMminutos = (min, max, step) => {
            for (i = min; i <= max; i += step)
                {info.samambaia.minutos.push(i)}
        }
        SAMminutos(10, 50, 20)
        }       
    
    
        // Checando que horas você chegou e que horas o metrô passa
        if ((info.ceilandia.horas.includes(hora)) || info.samambaia.horas.includes(hora)){
            for (i = 0; i <= info.ceilandia.minutos.length; i++){
                if ((minutos <= info.ceilandia.minutos[i]) && (minutos > info.ceilandia.minutos[i-1])) 
                   resultado.push(info.ceilandia.minutos[i])
                }
            if ((minutos > 40) && (minutos < 60))
                {resultado.push(60)}
            for (i = 0; i <= info.samambaia.minutos.length; i++) {
                if ((minutos >= 10  &&(minutos <= info.samambaia.minutos[i]) && (minutos > info.samambaia.minutos[i-1])))
                    resultado.push(info.samambaia.minutos[i])
            }
            if ((minutos < 10) && (minutos > 0))
                 {resultado.push(info.samambaia.minutos[1])}
            if ((minutos > 50) && (minutos < 60))
                 {resultado.push(70)}
            
        }
    
        if (resultado[0] < resultado[1])
            resultado.pop()
        else resultado.shift()
    
        let proximoTrem = info.samambaia.minutos.includes(resultado[0]) ? "Samambaia" : "Ceilandia"
    

        if (info.ceilandia.horas.includes(hora) || info.samambaia.horas.includes(hora)) {
            if (info.ceilandia.minutos.includes(minutos) || info.samambaia.minutos.includes(minutos))
                return `
                <!DOCTYPE html> 
                <html lang ="en" id="background"> 
                    <head>
                        <title>METRO PROJECT</title>
                        <base href="/">
                        <link href="style2.css">
                    </head>
                    <body>
                        <div class = "white-box">
                            <h1>
                                O trem para ${proximoTrem} está na plataforma! CORRA!
                            </h1>
                    </body> </html>`
            else return `<h1> O próximo trem é para ${proximoTrem} e chegará em ${resultado-minutos} minutos! </h1>`
        }
        else return "O metro está fechado :("
        
    }
    
    //INSIRA AQUI O HORÁRIO DE CHEGADA NA ESTAÇÃO NO FORMATO (HORA,MINUTO)
    resp.send(metro(Number(horasReceived), Number(minutosReceived)))
})


app.listen('5502')






