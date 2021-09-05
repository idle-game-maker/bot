import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildId, token } from './secrets.js';
import { opendir } from 'fs/promises';
import { iter as wrapIterator, aiter as wrapAsyncIterator } from 'iterator-helper';
import { awaitIterator } from './utils.js';
import { Command } from './commands/types.js';

const commandNames = await awaitIterator(wrapAsyncIterator(await opendir('./commands')).filter(file => file.isFile() && file.name.endsWith('.js') && file.name !== 'types.js').map(file => file.name.replace(/\.js$/, '')));
const commands = await Promise.all(commandNames.map(async name => (await import(`./commands/${name}.js`)) as Command));
const commandDatas = commands.map(command => command.data.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

void async function () {
	try {
		console.log('Started refreshing slash commands');
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commandDatas }
		);
		console.log('Success!');
	} catch (ex) {
		console.error('An error occurred! Here\'s more info:');
		console.error(ex);
	}
}();