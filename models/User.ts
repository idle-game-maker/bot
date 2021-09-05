import type { ModelDefined } from 'sequelize';
import type * as _type_Sequelize from 'sequelize';
import { createRequire } from 'module';
const req = createRequire(import.meta.url);
const { DataTypes } = req('sequelize') as unknown as typeof _type_Sequelize;
import { sequelize } from '../db.js';
import { Game } from './Game.js';
import { Vote } from './Vote.js';

export interface UserAttributes {
	id: string;
}

type UserCreationAttributes = UserAttributes;

export const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	},
	{
		tableName: 'users'
	}
);

User.hasMany(Game);
User.hasMany(Vote);
Game.belongsTo(User);
Vote.belongsTo(User);

await sequelize.sync();