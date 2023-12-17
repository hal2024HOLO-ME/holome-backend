import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterRegisterInput } from './dto/characterRegister.input';

/**
 * CharacterControllerクラス：キャラクター情報を登録・取得するためのエンドポイントを提供する
 */
@Controller('character')
export class CharacterController {
	constructor(private readonly characterService: CharacterService) {}

	@HttpCode(200)
	@Post('register')
	async registerCharacterName(
		@Body() characterRegisterInput: CharacterRegisterInput,
	): Promise<void> {
		const { user_id, character_id, character_name } = characterRegisterInput;
		await this.characterService.registerCharacterName(
			user_id,
			character_id,
			character_name,
		);
	}
}
