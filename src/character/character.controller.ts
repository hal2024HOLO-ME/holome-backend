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
		const {
			user_id,
			character_id,
			character_name,
			character_type,
			character_file_name,
		} = characterRegisterInput;

		await this.characterService.registerCharacterName(
			user_id,
			character_id,
			character_name,
			character_type,
			character_file_name,
		);
	}

	@HttpCode(200)
	@Post('get-json')
	async getCharacterJson(
		@Body() user_id: { login_id: string },
	): Promise<string> {
		const { login_id } = user_id;
		const character_data_json =
			await this.characterService.getCharacterJson(login_id);

		return character_data_json;
	}
}
