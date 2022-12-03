const detectIntent = require('../controller/dialogflow');
const createIntent = require('../controller/intent');
const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
	res.send(`Hello World.!`);
});

// Dialogflow route
router.post('/dialogflow', async (req, res) => {
	let languageCode = req.body.languageCode;
	let queryText = req.body.queryText;
	let sessionId = req.body.sessionId;

	let responseData = await detectIntent(languageCode, queryText, sessionId);

	res.send(responseData.response);
});

router.get('/dialogflow', async (req, res) => {

	res.send('To implement');
});

router.put('/dialogflow', async (req, res) => {

	res.send('To implement');
});

router.delete('/dialogflow', async (req, res) => {

	res.send('To implement');
});

router.post('/intent', async (req, res) => {
	let displayName = req.body.displayName;
	let messageTexts = req.body.messageTexts;
	let trainingPhrasesParts = req.body.trainingPhrasesParts;

	let responseData = await createIntent(trainingPhrasesParts, messageTexts, displayName);

	res.send(responseData.response);
});

router.get('/intent', async (req, res) => {

	res.send('To implement');
});

router.put('/intent', async (req, res) => {

	res.send('To implement');
});

router.delete('/intent', async (req, res) => {

	res.send('To implement');
});

module.exports = router
