import { Injectable, Patch, Post, Put } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class CharacterService {
	constructor(private readonly prismaService: PrismaService) {}

	@Patch()
	async registerCharacterName(
		user_id: string,
		character_id: number,
		character_name: string,
		character_type: number,
		character_file_name: string,
	): Promise<void> {
		const character = await this.prismaService.characters.findFirst({
			select: {
				id: true,
				name: true,
				type: true,
			},
			where: {
				model_name: character_file_name,
				type: Number(character_type),
			},
		});

		if (character) {
			await this.prismaService.charactersUsers.update({
				where: {
					user_id_character_id: {
						user_id: user_id,
						character_id: Number(character.id),
					},
				},
				data: {
					character_name: character_name,
				},
			});
		} else {
			console.log('No record found with the provided user_id and character_id');
		}
	}
}
