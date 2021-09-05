import { SlashCommandBuilder, SlashCommandUserOption } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Ping } from '../models/Ping.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('A must-have for every Discord bot!')
	.addUserOption(new SlashCommandUserOption()
		.setName('user')
		.setDescription('What user to check the amount of pings for, omit to do a ping')
		.setRequired(false)
	);

export async function run(interaction: CommandInteraction) {
	if (interaction.options.getUser('user') != null) {
		const target = interaction.options.getUser('user', true);
		const { count: pings } = await Ping.findAndCountAll({ where: { user: target.id }});
		await interaction.reply(`User ${target.username} has pinged ${pings} time(s)`);
	} else {
		const { count: pings } = await Ping.findAndCountAll({ where: { user: interaction.user.id } });
		await Ping.create({
			user: interaction.user.id
		});
		await interaction.reply(`Pong! This is your ${pings === 0 ? 'first ping!' : `ping number ${pings + 1}.`}`);
	}
}