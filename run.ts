import { bot } from './index.js';
import { start } from './server.js';
import { token } from './secrets.js';

await start();
bot.login(token);