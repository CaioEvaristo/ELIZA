const createIntent = require('../controller/intent');
const reviewBotFlow = require('../controller/bot');
const { Router } = require('express')
const router = Router()

/*
Nao serve pra nada não
*/
router.get('/', (req, res) => {
	res.send(`Hello World.!`);
});

/* Route to create intent
	{
		"trainingPhrasesParts": [
			"Example",
			"Example phrase"
		],
		"botResponseMessage": ["Otimo", "Otimo exemplo", "é isso ai bem vindo"],
		"intentDisplayName": "tempo2"
	}
*/
router.post('/intent', async (req, res) => {
	const displayName = req.body.displayName;
	const botResponseMessage = req.body.botResponseMessage;
	const trainingPhrasesParts = req.body.trainingPhrasesParts;

	const responseData = await createIntent(trainingPhrasesParts, botResponseMessage, displayName);

	res.send(responseData.response);
});

module.exports = router
