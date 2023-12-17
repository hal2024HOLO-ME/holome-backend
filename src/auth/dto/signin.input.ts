import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class SignInInput {
	@IsNotEmpty({
		message: 'ユーザーIDを入力してください',
	})
	login_id: string;

	// TODO: 	@IsString()が必要か検討
	@MinLength(8, {
		message: 'ユーザーIDまたはパスワードが間違っています',
	})
	@MaxLength(32, {
		message: 'ユーザーIDまたはパスワードが間違っています',
	})
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,32}$/, {
		message: 'ユーザーIDまたはパスワードが間違っています',
	})
	@IsNotEmpty({
		message: 'パスワードを入力してください',
	})
	password: string;
}
