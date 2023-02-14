const detectIntent = require('../services/dialogflow-services')
/*
    Bot Receptivo
        cliente manda msg -> analiso a etapa -> respondo
    Bot Ativo
        bot manda msg -> cai no receptivo
*/

async function reviewBotFlow(botConfig) {
    let {
        client_id,
        bot_type,
        message, 
        bot_id,
        step
    } = botConfig
    let result

    let conversation = false // findConversation(client_id, bot_id, step)
    /* Controle de passos, caso exista conversation verificar o step em que se encontra 
        Caso nao exista conversation estamos no passo 1.
    */
    if (!conversation) {
        step = 'welcome'
        const responses = await detectIntent({ languageCode:"pt-BR", queryText: message, sessionId: "12" })

        console.log(responses)
        result = responses[0].queryResult;
    }

    console.log(result)

    return
}

module.exports = reviewBotFlow
