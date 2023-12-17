import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const insertUsers = async () => {
	const now = new Date();
	await prisma.users.createMany({
		data: [
			{
				id: '018b6fbd-72b5-7000-b31b-42e0a3825abf',
				login_id: 'abcdefg',
				password:
					'$2b$10$SOTWXPvh8Vy2vTfd4UUGfuh9pN1q/rT5Rlg8OK/YLx3JQFvkpxxvO',
				created_at: now,
			},
		],
	});
};
