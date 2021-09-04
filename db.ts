import { Sequelize } from 'sequelize';
import { dbUser, dbPassword } from './secrets.js';

export const sequelize = new Sequelize('igmDatabase', dbUser, dbPassword, {
	dialect: 'sqlite',
	storage: 'db.sqlite'
});