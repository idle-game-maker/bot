import type { ModelDefined, Optional } from 'sequelize';
import type * as _type_Sequelize from 'sequelize';
import { createRequire } from 'module';
const req = createRequire(import.meta.url);
const { DataTypes } = req('sequelize') as unknown as typeof _type_Sequelize;
import { sequelize } from '../db.js';
import { Game } from './Game.js';

export interface GameVersionAttributes {
	id: number;
	major: number;
	minor: number;
	patch: number;
	status: 'alpha' | 'beta' | 'release';
}

type GameVersionCreationAttributes = Optional<GameVersionAttributes, 'id'>;

export const GameVersion: ModelDefined<GameVersionAttributes, GameVersionCreationAttributes> = sequelize.define(
	'GameVersion',
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		major: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			validate: {
				min: 0
			},
		},
		minor: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			validate: {
				min: 0
			},
		},
		patch: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			validate: {
				min: 0
			},
		},
		status: {
			type: DataTypes.ENUM('alpha', 'beta', 'release'),
			defaultValue: 'release',
			allowNull: false,
		},
	},
	{
		tableName: 'versions'
	}
);

await sequelize.sync();