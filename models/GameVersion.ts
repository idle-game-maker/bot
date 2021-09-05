import { BelongsToGetAssociationMixin, Optional } from 'sequelize';
import type * as _type_Sequelize from 'sequelize';
import { createRequire } from 'module';
const req = createRequire(import.meta.url);
const { DataTypes, Model } = req('sequelize') as unknown as typeof _type_Sequelize;
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

interface GameVersionMixins {
	getGame: BelongsToGetAssociationMixin<Game>;
}

export class GameVersion extends Model<GameVersionAttributes, GameVersionCreationAttributes>
	implements GameVersionAttributes, GameVersionMixins {
	id!: number;
	major!: number;
	minor!: number;
	patch!: number;
	status!: 'alpha' | 'beta' | 'release';

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	getGame!: BelongsToGetAssociationMixin<Game>;
}

GameVersion.init(
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
		tableName: 'versions',
		sequelize,
	}
);

await sequelize.sync();