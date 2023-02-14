require('dotenv').config();
const amqplib = require('amqplib');
const detectIntent = require('../services/dialogflow-services')

module.exports = async function detectIntentController (intent) {
	const { languageCode, queryText, sessionId } = intent

	const responses = await detectIntent({ languageCode, queryText, sessionId });
	const result = responses[0].queryResult;

	// RabbitMQ
	const conn = await amqplib.connect('amqp://root:q1w2e3@127.0.0.1:5672');
	const channel = await conn.createChannel();

	await channel.assertQueue('rcs-core-sender', {durable: false});

	channel.sendToQueue('rcs-core-sender', Buffer.from(JSON.stringify(bodyToCore)))

	return {
		response: result
	};
}
