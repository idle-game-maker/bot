import type { ModelDefined, Optional } from 'sequelize';
import type * as _type_Sequelize from 'sequelize';
import { createRequire } from 'module';
const req = createRequire(import.meta.url);
const { DataTypes } = req('sequelize') as unknown as typeof _type_Sequelize;
import { sequelize } from '../db.js';
import { User } from './User.js';
import { Vote } from './Vote.js';
import { GameVersion } from './GameVersion.js';

export interface GameAttributes {
	id: number;
	name: string;
}

type GameCreationAttributes = Optional<GameAttributes, 'id'>;

export const Game: ModelDefined<GameAttributes, GameCreationAttributes> = sequelize.define(
	'Game',
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'games'
	}
);

Game.hasMany(GameVersion);
GameVersion.belongsTo(Game);
Game.hasMany(Vote);

await sequelize.sync();