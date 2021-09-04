try {
	const { config } = await import('dotenv');
	config();
} catch {
	// in production environment
}

export const token = process.env.BOT_TOKEN!
export const clientId = process.env.BOT_CLIENT_ID!
export const guildId = process.env.BOT_GUILD_ID!
export const dbUser = process.env.DB_USERNAME!
export const dbPassword = process.env.DB_PASSWORD!