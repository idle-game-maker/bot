import { bot } from './index.js';
import { GuildEmoji } from 'discord.js';

const emojiGuild = bot.guilds.cache.get('884139129720422500')!;

export const alpha = new GuildEmoji(bot, { id: '884140924337291344', name: 'alpha' }, emojiGuild);
export const beta = new GuildEmoji(bot, { id: '884140924362444860', name: 'beta' }, emojiGuild);
export const mu = new GuildEmoji(bot, { id: '884148767316647988', name: 'mu' }, emojiGuild);
export const sigma = new GuildEmoji(bot, { id: '884148767765438524', name: 'sigma' }, emojiGuild);