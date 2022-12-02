const dialogflow = require('@google-cloud/dialogflow');

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const PROJECID = CREDENTIALS.project_id;

const CONFIGURATION = {
	credentials: {
			private_key: CREDENTIALS['private_key'],
			client_email: CREDENTIALS['client_email']
	}
}

const intentsClient = new dialogflow.IntentsClient(CONFIGURATION);

export const createIntent = async (trainingPhrasesParts, messageTexts, displayName) => {
	// Construct request

	// The path to identify the agent that owns the created intent.
	const agentPath = intentsClient.projectAgentPath(PROJECID);

	const trainingPhrases = [];

	trainingPhrasesParts.forEach(trainingPhrasesPart => {
		const part = {
			text: trainingPhrasesPart,
		};

		// Here we create a new training phrase for each provided part.
		const trainingPhrase = {
			type: 'EXAMPLE',
			parts: [part],
		};

		trainingPhrases.push(trainingPhrase);
	});

	const messageText = {
		text: messageTexts,
	};

	const message = {
		text: messageText,
	};

	const intent = {
		displayName: displayName,
		trainingPhrases: trainingPhrases,
		messages: [message],
	};

	const createIntentRequest = {
		parent: agentPath,
		intent: intent,
	};

	// Create the intent
	const [response] = await intentsClient.createIntent(createIntentRequest);
	console.log(`Intent ${response.name} created`);

	return {
			response: response
	};
}
