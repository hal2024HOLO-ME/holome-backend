import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const insertCharacters = async () => {
	const date = new Date();
	await prisma.characters.createMany({
		data: [
			{
				id: 1,
				name: 'ねこ',
				model_name: 'CatVerNormal',
				description:
					'「内向的感情タイプ」に該当。自分特有の「わたしは」という。感情を持つ。故に、周囲と感情を共有するのが苦手。感情を積極的に表明しない。外見上は控え目。',
				type: 0,
				created_at: date,
				updated_at: date,
			},
			{
				id: 2,
				name: 'ねこ',
				model_name: 'CatVerGhost',
				description:
					'「内向的感情タイプ」に該当。自分特有の「わたしは」という。感情を持つ。故に、周囲と感情を共有するのが苦手。感情を積極的に表明しない。外見上は控え目。',
				type: 1,
				created_at: date,
				updated_at: date,
			},
			{
				id: 3,
				name: 'いぬ',
				model_name: 'DogVerNormal',
				description:
					'「外交的感情タイプ」に該当。感情を表明したり、共有したりするのが得意（基本的に）どこででも自然な態度でいられる。感情に素直ギクシャクしたところがない。',
				type: 0,
				created_at: date,
				updated_at: date,
			},
			{
				id: 4,
				name: 'いぬ',
				model_name: 'DogVerGhost',
				description:
					'「外交的感情タイプ」に該当。感情を表明したり、共有したりするのが得意（基本的に）どこででも自然な態度でいられる。感情に素直ギクシャクしたところがない。',
				type: 1,
				created_at: date,
				updated_at: date,
			},
			{
				id: 5,
				name: 'たぬき',
				model_name: 'TanukiVerNormal',
				description:
					'「外交的」穏やかかつ、礼儀正しい言動が最大の魅力。反面、鋼のように強靭なハートを持っていて、どんな困難にも負けない人でもあります。礼儀正しく穏やかで、思いやりのある人なので、上司からも部下からも愛顧される。',
				type: 0,
				created_at: date,
				updated_at: date,
			},
			{
				id: 6,
				name: 'たぬき',
				model_name: 'TanukiVerGhost',
				description:
					'「外交的」穏やかかつ、礼儀正しい言動が最大の魅力。反面、鋼のように強靭なハートを持っていて、どんな困難にも負けない人でもあります。礼儀正しく穏やかで、思いやりのある人なので、上司からも部下からも愛顧される。',
				type: 1,
				created_at: date,
				updated_at: date,
			},
			{
				id: 7,
				name: 'きつね',
				model_name: 'KitsuneVerNormal',
				description:
					'「外交的」頭の回転が早く機転の効く性格ですが、気まぐれで奔放なところがあります。周囲にとってもポジティブな影響を与える力のある人なのですが、悪い影響も広めてしまうようなカリスマ性を持っている。',
				type: 0,
				created_at: date,
				updated_at: date,
			},
			{
				id: 8,
				name: 'きつね',
				model_name: 'KitsuneVerGhost',
				description:
					'「外交的」頭の回転が早く機転の効く性格ですが、気まぐれで奔放なところがあります。周囲にとってもポジティブな影響を与える力のある人なのですが、悪い影響も広めてしまうようなカリスマ性を持っている。',
				type: 1,
				created_at: date,
				updated_at: date,
			},
			{
				id: 9,
				name: 'ミィ',
				model_name: 'MiiVerNormal',
				description:
					'「独創的知識探求タイプ」に該当。あなたは持ち前の“ユニークな視野”を持つ人たちです。この性格タイプの人たちはかなりまれで、独創性と創作力を備えているため、周りから注目を浴びるのも恐れません。',
				type: 0,
				created_at: date,
				updated_at: date,
			},
			{
				id: 10,
				name: 'ミィ',
				model_name: 'MiiVerGhost',
				description:
					'「独創的知識探求タイプ」に該当。あなたは持ち前の“ユニークな視野”を持つ人たちです。この性格タイプの人たちはかなりまれで、独創性と創作力を備えているため、周りから注目を浴びるのも恐れません。',
				type: 1,
				created_at: date,
				updated_at: date,
			},
		],
	});
};
