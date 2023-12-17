import { IsString } from 'class-validator';

export class DiagnosisInput {
	@IsString({
		message: '文字列を入力してください',
	})
	character_type: string;

	@IsString({
		message: '文字列を入力してください',
	})
	character_name: string;
}
