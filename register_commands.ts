import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildId, token } from './secrets.js';

const commands = [
	{
		name: 'ping',
		description: 'A must-have for any Discord bot.'
	}
];

const rest = new REST({ version: '9' }).setToken(token);

void async function () {
	try {
		console.log('Started refreshing slash commands');
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands }
		);
		console.log('Success!');
	} catch (ex) {
		console.error('An error occurred! Here\'s more info:');
		console.error(ex);
	}
}();