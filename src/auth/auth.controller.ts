import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
	HttpCode,
	Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signin.input';
import { SignUpInput } from './dto/signup.input';
import { SignOutInput } from './dto/signout.input';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Get('signin')
	getHello(): Promise<string> {
		return this.authService.getHello();
	}

	/**
	 * サインイン
	 * @param {SignInInput} signInInput - ログイン情報
	 * @returns {Promise<string>} アクセストークン
	 */
	@HttpCode(200)
	@Post('signin')
	async signIn(@Body() signInInput: SignInInput): Promise<object> {
		const { login_id, password } = signInInput;

		const user = await this.authService.validateUser(login_id, password);

		const isCharacterExists = await this.authService.searchCharactersFromDB(
			user.id,
		);

		/**
		 * login_idまたはpasswordが間違っている場合の処理
		 * @throws {paths["/api/v1/auth/signin"]["post"]["responses"]["401"]}
		 */
		if (!user) {
			throw new HttpException(
				{
					status: HttpStatus.UNAUTHORIZED,
					error: 'Unauthorized',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}

		return { id: user.id, isCharacterExists };
	}

	/**
	 * サインアップ
	 * @param signUpInput ユーザーID、パスワード
	 * @returns LoginSceneに移動
	 */
	@HttpCode(200)
	@Post('signup')
	async signUp(@Body() signUpInput: SignUpInput): Promise<string> {
		const user = await this.authService.getUser(signUpInput.login_id);
		/**
		 * login_idがすでに登録されている場合の処理
		 * @throws {paths["/api/v1/auth/signup"]["post"]["responses"]["400"]}
		 */
		if (user)
			throw new HttpException(
				{
					type: 'validation',
					message: [
						{
							property: 'login_id',
							message: 'このユーザーIDはすでに登録されています',
						},
					],
				},
				HttpStatus.BAD_REQUEST,
			);

		const user_id = await this.authService.signUp(signUpInput);

		/**
		 * ユーザー登録に失敗した場合の処理
		 * @throws {paths["/api/v1/auth/signup"]["post"]["responses"]["500"]}
		 */
		if (!user_id)
			throw new HttpException(
				{
					message: '会員登録に失敗しました',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		return user_id;
	}

	/**
	 * サインアップ
	 * @param signOutInput
	 */
	@HttpCode(200)
	@Post('signout')
	async signOut(@Body() signOutInput: SignOutInput): Promise<void> {
		const { login_id, character_type, character_name, json_data } =
			signOutInput;

		// TODO: セッションなかったらの対応（優先度低い）
		// const user = await this.authService.getUser(login_id);

		// console.log(user);
		/**
		 * login_idが登録されていない場合の処理
		 * @throws {paths["/api/v1/auth/signout"]["post"]["responses"]["400"]}
		 */
		// if (!user)
		// 	throw new HttpException(
		// 		{
		// 			type: 'validation',
		// 			message: [
		// 				{
		// 					property: 'login_id',
		// 					message: 'このユーザーIDは登録されていません',
		// 				},
		// 			],
		// 		},
		// 		HttpStatus.BAD_REQUEST,
		// 	);

		await this.authService.signOut(login_id, character_name, json_data);
	}
}
