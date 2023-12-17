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
	async signIn(@Body() signInInput: SignInInput): Promise<string> {
		const { login_id, password } = signInInput;

		const user = await this.authService.validateUser(login_id, password);

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

		return user.id;
	}

	/**
	 * サインアップ
	 * @param signUpInput ユーザーID、パスワード
	 * @returns LoginSceneに移動
	 */
	@HttpCode(200)
	@Post('signup')
	async signUp(@Body() signUpInput: SignUpInput): Promise<void> {
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

		const newUser = await this.authService.signUp(signUpInput);

		/**
		 * ユーザー登録に失敗した場合の処理
		 * @throws {paths["/api/v1/auth/signup"]["post"]["responses"]["500"]}
		 */
		if (!newUser)
			throw new HttpException(
				{
					message: '会員登録に失敗しました',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		return;
	}
}
