import { Optional } from 'sequelize';
import type * as _type_Sequelize from 'sequelize';
import { createRequire } from 'module';
const req = createRequire(import.meta.url);
const { DataTypes, Model } = req('sequelize') as unknown as typeof _type_Sequelize;
import { sequelize } from '../db.js';
import { Game } from './Game.js';
import { Vote } from './Vote.js';

export interface UserAttributes {
	id: number;
	userId: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

interface UserMixins {

}

export class User extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes, UserMixins {
	id!: number;
	userId!: string;
	
	readonly createdAt!: Date;
	readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.NUMBER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
	{
		tableName: 'users',
		sequelize,
	}
);

User.hasMany(Game);
User.hasMany(Vote);
Game.belongsTo(User);
Vote.belongsTo(User);

await sequelize.sync();