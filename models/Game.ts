import { Association, BelongsToGetAssociationMixin, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Optional } from 'sequelize';
import type * as _type_Sequelize from 'sequelize';
import { createRequire } from 'module';
const req = createRequire(import.meta.url);
const { DataTypes, Model } = req('sequelize') as unknown as typeof _type_Sequelize;
import { sequelize } from '../db.js';
import { User } from './User.js';
import { Vote } from './Vote.js';
import { GameVersion } from './GameVersion.js';

export interface GameAttributes {
	id: number;
	name: string;
}

type GameCreationAttributes = Optional<GameAttributes, 'id'>;

interface GameMixins {
	getGameVersions: HasManyGetAssociationsMixin<GameVersion>;
	addGameVersion: HasManyAddAssociationMixin<GameVersion, number>;
	getUser: BelongsToGetAssociationMixin<User>;
}

export class Game extends Model<GameAttributes, GameCreationAttributes>
	implements GameMixins, GameAttributes {
	id!: number;
	name!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getGameVersions!: HasManyGetAssociationsMixin<GameVersion>;
	public addGameVersion!: HasManyAddAssociationMixin<GameVersion, number>;
	public getUser!: BelongsToGetAssociationMixin<User>;

	public readonly gameVersions?: GameVersion[];

	public static associations: {
		gameVersions: Association<Game, GameVersion>;
	};
}

Game.init(
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
		tableName: 'games',
		sequelize,
	}
);

Game.hasMany(GameVersion);
GameVersion.belongsTo(Game);
Game.hasMany(Vote);

await sequelize.sync();