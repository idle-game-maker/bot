import type { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';

export interface Command {
	data: SlashCommandBuilder;
	run(interaction: CommandInteraction): Promise<void>;
}