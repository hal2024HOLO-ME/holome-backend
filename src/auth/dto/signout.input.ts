import { IsString } from 'class-validator';

export class SignOutInput {
	@IsString({
		message: '文字列を入力してください',
	})
	login_id: string;

	@IsString({
		message: '文字列を入力してください',
	})
	character_type: string;

	@IsString({
		message: '文字列を入力してください',
	})
	character_name: string;

	json_data: string;
}
