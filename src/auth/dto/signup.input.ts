import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpInput {
	@IsNotEmpty({
		message: 'ユーザーIDを入力してください',
	})
	login_id: string;

	@IsString()
	@MinLength(8, {
		message: '8文字以上である必要があります。',
	})
	@MaxLength(32, {
		message: '32文字以下である必要があります。',
	})
	@IsNotEmpty({
		message: 'パスワードを入力してください',
	})
	password: string;
}
