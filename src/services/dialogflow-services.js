
const dialogflow = require('@google-cloud/dialogflow');

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const CONFIGURATION = {
	credentials: {
		private_key: CREDENTIALS['private_key'],
		client_email: CREDENTIALS['client_email']
	}
}

const PROJECID = CREDENTIALS.project_id;

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

async function detectIntent(request) {
    let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, request.sessionId);

	request = {
		session: sessionPath,
		queryInput: {
			text: {
				text: request.queryText,
				languageCode: request.languageCode,
			},
		},
	};

    return await sessionClient.detectIntent(request);
}

module.exports = detectIntent
