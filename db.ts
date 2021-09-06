import type * as _type_Prisma from '@prisma/client';
import { createRequire } from 'module';
const req = createRequire(import.meta.url);
const { PrismaClient } = req('@prisma/client') as unknown as typeof _type_Prisma;

export const prisma = new PrismaClient();

export async function user(id: string) {
	async function get() {
		return await prisma.user.findUnique({
			where: { userId: id },
			include: {
				games: true,
				pings: true,
				votes: true,
				_count: {
					select: {
						games: true,
						pings: true,
						votes: true,
					}
				},
			},
		});
	}
	const u = await get();
	if (u === null) await prisma.user.create({
		data: {
			userId: id
		},
	});
	return u ?? (await get())!;
}