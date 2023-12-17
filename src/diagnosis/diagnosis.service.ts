import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * DiagnosisServiceクラス：キャラクターの診断結果を取得するためのサービス
 */
@Injectable()
export class DiagnosisService {
	constructor(private readonly prismaService: PrismaService) {}

	/**
	 * 指定されたキャラクタータイプとキャラクター名に基づいて診断結果を取得する
	 * @param {string} character_type - キャラクターのタイプ
	 * @param {string} character_name - キャラクターの名前
	 * @returns {Promise<{ name: string; description: string; model_name: string }>} 診断結果
	 */
	async getDiagnosisResult(
		character_type: string,
		character_name: string,
	): Promise<{ name: string; description: string; model_name: string }> {
		const character = await this.prismaService.characters.findFirst({
			select: {
				name: true,
				description: true,
				model_name: true,
			},
			where: {
				type: Number(character_type),
				name: character_name,
			},
		});

		return {
			name: character.name,
			description: character.description,
			model_name: character.model_name,
		};
	}
}
