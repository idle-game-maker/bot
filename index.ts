import { Client, Intents } from 'discord.js';
import { iter as wrapIterator, aiter as wrapAsyncIterator } from 'iterator-helper';
import { awaitIterator, zip } from './utils.js';
import { Command } from './commands/types.js';
import { opendir } from 'fs/promises';

console.log('after imports');

export const bot = new Client({ intents: [ Intents.FLAGS.GUILDS ]});

console.log('after bot made', bot);

const commandNames = await awaitIterator(wrapAsyncIterator(await opendir('./commands')).filter(file => file.isFile() && file.name.endsWith('.js') && file.name !== 'types.js').map(file => file.name.replace(/\.js$/, '')));

console.log('after commandNames', commandNames);

const commandSet = await Promise.all(commandNames.map(async name => (await import(`./commands/${name}.js`)) as Command));

console.log('after commandSet', commandSet);

const commands = Object.fromEntries(zip(commandNames, commandSet));

console.log('after commands', commands);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user!.tag} and ready to work!`);
});

bot.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		if (interaction.commandName in commands) {
			await commands[interaction.commandName].run(interaction);
		} else {
			await interaction.reply({ content: `Unknown command ${interaction.commandName}`, ephemeral: true });
		}
	}
});