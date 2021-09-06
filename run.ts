import { bot } from './index.js';
import { start } from './server.js';
import { token } from './secrets.js';
import { prisma } from './db.js';

try {
	await start();
	bot.login(token);
} finally {
	await prisma.$disconnect();
}