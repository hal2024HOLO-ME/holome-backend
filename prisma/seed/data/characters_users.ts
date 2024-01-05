import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const insertCharactersUsers = async () => {
	await prisma.charactersUsers.createMany({
		data: [
			{
				user_id: '018b6fbd-72b5-7000-b31b-42e0a3825abf',
				character_id: 5,
				character_name: 'ちょこ',
				// NOTE: Unity側がJSON文字列を受け取るため、JSON.stringify()で文字列化している。Unity側がClassなのでパスカルケースを変数名に用いてる
				characterData: JSON.stringify({
					nostalgic_level: 30,
					color: {
						eye: {
							r: 0.14901961386203767,
							g: 0.5882353186607361,
							b: 0.0,
							a: 0.0,
						},
						ear: {
							r: 0.8666667342185974,
							g: 0.7764706611633301,
							b: 0.5764706134796143,
							a: 0.0,
						},
						body: {
							r: 0.8666667342185974,
							g: 0.7764706611633301,
							b: 0.5764706134796143,
							a: 0.0,
						},
					},
					customize: { neck: 'ribon', head: 'tiara', face: 'sanGlasses' },
				}),
			},
		],
	});
};
