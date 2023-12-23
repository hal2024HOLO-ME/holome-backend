import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const insertCharactersUsers = async () => {
	await prisma.charactersUsers.createMany({
		data: [
			{
				user_id: '018b6fbd-72b5-7000-b31b-42e0a3825abf',
				character_id: 5,
				character_name: 'ちょこ',
				character_data: {
					nostalgic_level: 30,
					color: {
						eye: '1.000, 0.000, 0.000, 0.00',
						ear: '1.000, 0.000, 0.000, 0.000',
						body: '1.000, 0.000, 0.000, 0.000',
					},
					customize: {
						neck: 'bell',
						head: 'hat',
						face: 'glasses',
					},
				},
			},
		],
	});
};
