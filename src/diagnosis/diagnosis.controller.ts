import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisInput } from './dto/diagnosisInput';

/**
 * DiagnosisControllerクラス：診断結果を取得するためのエンドポイントを提供する
 */
@Controller('diagnosis')
export class DiagnosisController {
	constructor(private readonly diagnosisService: DiagnosisService) {}

	/**
	 * 指定されたキャラクタータイプとキャラクター名に基づいて診断結果を取得する
	 * @param {DiagnosisInput} diagnosisInput - 診断入力データ
	 * @returns {Promise<{ name: string; description: string }>} 診断結果
	 */
	@HttpCode(200)
	@Post()
	async getDiagnosisResult(
		@Body() diagnosisInput: DiagnosisInput,
	): Promise<{ name: string; description: string; model_name: string }> {
		const { character_type, character_name, user_id } = diagnosisInput;

		const character = await this.diagnosisService.getDiagnosisResult(
			character_type,
			character_name,
			user_id,
		);

		return character;
	}
}
