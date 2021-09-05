import { bot } from './index.js';
import { GuildEmoji } from 'discord.js';

const emojiGuild = bot.guilds.cache.get('884139129720422500');

export const alpha = new GuildEmoji(bot, { id: '884140924337291344', name: 'alpha' }, emojiGuild);
export const beta = new GuildEmoji(bot, { id: '884140924362444860', name: 'beta' }, emojiGuild);
export const omega = new GuildEmoji(bot, { id: '884140924379230328', name: 'omega' }, emojiGuild);