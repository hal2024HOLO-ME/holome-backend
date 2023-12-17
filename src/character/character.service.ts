import { Injectable, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CharacterService {
	constructor(private readonly prismaService: PrismaService) {}

	@Patch()
	async registerCharacterName(
		user_id: string,
		character_id: number,
		character_name: string,
	): Promise<void> {
		await this.prismaService.charactersUsers.update({
			where: {
				user_id_character_id: {
					user_id,
					character_id: Number(character_id),
				},
			},
			data: {
				character_name: character_name,
			},
		});
	}
}
