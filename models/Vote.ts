import type { ModelDefined, Optional } from 'sequelize';
import type * as _type_Sequelize from 'sequelize';
import { createRequire } from 'module';
const req = createRequire(import.meta.url);
const { DataTypes } = req('sequelize') as unknown as typeof _type_Sequelize;
import { sequelize } from '../db.js';
import { User } from './User.js';
import { GameVersion } from './GameVersion.js';

export interface VoteAttributes {
	id: number;
}

type VoteCreationAttributes = Optional<VoteAttributes, 'id'>;

export const Vote: ModelDefined<VoteAttributes, VoteCreationAttributes> = sequelize.define(
	'Vote',
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
	},
	{
		tableName: 'votes'
	}
);

await sequelize.sync();