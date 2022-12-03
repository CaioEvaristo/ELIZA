require('dotenv').config();
const dialogflow = require('@google-cloud/dialogflow');
// const axios = require('axios')
// const { google } = require('googleapis')
const amqplib = require('amqplib');

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const PROJECID = CREDENTIALS.project_id;

const CONFIGURATION = {
	credentials: {
		private_key: CREDENTIALS['private_key'],
		client_email: CREDENTIALS['client_email']
	}
}

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

module.exports = async function detectIntent (languageCode, queryText, sessionId) {

	let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

	let request = {
		session: sessionPath,
		queryInput: {
			text: {
				text: queryText,
				languageCode: languageCode,
			},
		},
	};

	const responses = await sessionClient.detectIntent(request);
	const result = responses[0].queryResult;
	// console.log(result);

	const bodyToCore = {
		"client_id": '6',
		"to": '11949752183',
		"body": {
			"text": {
				"message": result.fulfillmentText
			}
		},
		"direction": "outbound"
	}

	// RabbitMQ
	const conn = await amqplib.connect('amqp://root:q1w2e3@127.0.0.1:5672');
	const channel = await conn.createChannel();

	await channel.assertQueue('rcs-core-sender', {durable: false});

	channel.sendToQueue('rcs-core-sender', Buffer.from(JSON.stringify(bodyToCore)))

	return {
		response: 'feito o retorno esta no meu webhook'
	};
}
