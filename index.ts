import { Client, Intents } from 'discord.js';
import { token } from './secrets.js'
import { start } from './server.js';
import { iter as wrapIterator, aiter as wrapAsyncIterator } from 'iterator-helper';
import { awaitIterator, zip } from './utils.js';
import { Command } from './commands/types.js';
import { opendir } from 'fs/promises';
import isMain from 'es-main';

const commandNames = await awaitIterator(wrapAsyncIterator(await opendir('./commands')).filter(file => file.isFile() && file.name.endsWith('.js') && file.name !== 'types.js').map(file => file.name.replace(/\.js$/, '')));
const commandSet = await Promise.all(commandNames.map(async name => (await import(`./commands/${name}.js`)) as Command));
const commands = Object.fromEntries(zip(commandNames, commandSet));

export const bot = new Client({ intents: [ Intents.FLAGS.GUILDS ]});

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

if (isMain(import.meta)) {
	await start();
	bot.login(token);
}