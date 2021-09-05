import { Client, Intents } from 'discord.js';
import { token } from './secrets.js';
import { sequelize } from './db.js';
import { start } from './server.js';
import { Ping } from './models/Ping.js';

const bot = new Client({ intents: [ Intents.FLAGS.GUILDS ]});

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user!.tag} and ready to work!`);
});

bot.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		switch (interaction.commandName) {
			case 'ping':
				const { count: pings } = await Ping.findAndCountAll({ where: { user: interaction.user.id } });
				await Ping.create({
					user: interaction.user.id
				});
				await interaction.reply(`Pong! This is your ${pings === 0 ? 'first ping!' : `ping number ${pings + 1}.`}`);
		}
	}
});

await start();

bot.login(token);