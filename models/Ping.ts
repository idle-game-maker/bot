import type { ModelDefined, Optional } from 'sequelize';
import type * as _type_Sequelize from 'sequelize';
import { createRequire } from 'module';
const req = createRequire(import.meta.url);
const { DataTypes } = req('sequelize') as unknown as typeof _type_Sequelize;
import { sequelize } from '../db.js';

export interface PingAttributes {
	id: number;
	user: string;
}

type PingCreationAttributes = Optional<PingAttributes, 'id'>;

export const Ping: ModelDefined<PingAttributes, PingCreationAttributes> = sequelize.define(
	'Ping',
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		user: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'pings'
	}
);

await sequelize.sync();