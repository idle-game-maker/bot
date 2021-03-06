import type { GameVersion } from '@prisma/client';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import * as emojis from '../emojis.js';
import { prisma } from '../db.js';
// import { bot } from '../index.js'

export const data = new SlashCommandBuilder()
	.setName('game')
	.setDescription('test command for game related stuff')
	.addSubcommand(s =>
		s
			.setName('list')
			.setDescription('List all games')
			.addStringOption(str =>
				str
					.setName('filter')
					.setDescription('If present, only show games in this release status')
					.addChoices([
						['α ~ Open alpha release', 'alpha'],
						['β ~ Beta release', 'beta'],
						['Σ ~ Full release', 'release'],
					])
					.setRequired(false)
			)
	)
	.addSubcommand(s =>
		s
			.setName('create')
			.setDescription('Create a new game')
			.addStringOption(str =>
				str
					.setName('name')
					.setDescription('Name of the game')
					.setRequired(true)
			)
	)
	.addSubcommand(s =>
		s
			.setName('createversion')
			.setDescription('Release a new version of a game')
			.addStringOption(str => 
				str
					.setName('game')
					.setDescription('ID of the game this version belongs to')
					.setRequired(true)
			)
			.addIntegerOption(int =>
				int
					.setName('major')
					.setDescription('Major version of the semver version tag')
					.setRequired(true)
			)
			.addIntegerOption(int =>
				int
					.setName('minor')
					.setDescription('Minor version of the semver version tag')
					.setRequired(true)
			)
			.addIntegerOption(int =>
				int
					.setName('patch')
					.setDescription('Patch version of the semver version tag')
					.setRequired(true)
			)
			.addStringOption(str =>
				str
					.setName('type')
					.setDescription('What type of release this version is')
					.addChoices([
						['α ~ Open alpha release', 'alpha'],
						['β ~ Beta release', 'beta'],
						['Σ ~ Full release', 'release'],
					])
					.setRequired(true)
			)
	)
	.addSubcommand(s =>
		s
			.setName('info')
			.setDescription('Information about a game')
			.addStringOption(str =>
				str
					.setName('game')
					.setDescription('ID of the game')
					.setRequired(true)
			)
	)

function showLatestVersion(versions: GameVersion[]) {
	if (versions.length === 0) return `unreleased`;
	const latest = versions.slice().sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
	return `${
		latest.status === 'RELEASE' ? emojis.sigma :
		latest.status === 'BETA' ? emojis.beta :
		latest.status === 'ALPHA' ? emojis.alpha : (() => { throw new Error('aaaaaa') })()
	} ${latest.major}.${latest.minor}.${latest.patch}`;
}

export async function run(interaction: CommandInteraction) {
	switch (interaction.options.getSubcommand()) {
		case 'list':
			await list(interaction);
			break;
		default:
			// fails
			break;
	}
}

async function list(interaction: CommandInteraction) {
	let games = await prisma.game.findMany({ include: { versions: true, author: true } });
	if (interaction.options.getString('filter')) {
		const filter = interaction.options.getString('filter', true);
		games = await Promise.all(games.map(async game => {
			const versions = game.versions;
			return [game, versions.some(v => v.status === filter)] as const;
		})).then(gs => gs.filter(([g, has]) => has).map(([g]) => g));
	}
	let str = '';
	for (const game of games) {
		str += `* ${
			game.versions.some(v => v.status === 'RELEASE') ? emojis.sigma :
			game.versions.some(v => v.status === 'BETA') ? emojis.beta :
			game.versions.some(v => v.status === 'ALPHA') ? emojis.alpha :
			emojis.mu
		} ${game.name} (${showLatestVersion(game.versions)}) by ${game.author.userId} with ID ${game.id}`;
	}
}