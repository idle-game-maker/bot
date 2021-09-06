import { SlashCommandBuilder, SlashCommandUserOption } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import * as db from '../db.js';
const { prisma } = db;

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
		const user = await db.user(target.id);
		const pings = user._count?.pings;
		await interaction.reply(`User ${target.username} has pinged ${pings} time(s)`);
	} else {
		const user = await db.user(interaction.user.id);
		const pings = user._count?.pings ?? 0;
		await prisma.ping.create({
			data: {
				userId: user.id,
			}
		})
		await interaction.reply(`Pong! This is your ${pings === 0 ? 'first ping!' : `ping number ${pings + 1}.`}`);
	}
}