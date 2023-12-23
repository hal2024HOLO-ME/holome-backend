import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordOmitUsers } from './types/passwordOmitUsers';
import * as bcrypt from 'bcrypt';
import { SignUpInput } from './dto/signup.input';
import { uuidv7 } from '@kripod/uuidv7';

@Injectable()
export class AuthService {
	constructor(private readonly prismaService: PrismaService) {}

	async getHello(): Promise<string> {
		return 'Hello World!';
	}

	async getUser(login_id: string): Promise<Users> {
		return await this.prismaService.users.findUnique({
			where: {
				login_id,
			},
		});
	}

	async verifyPassword(
		plainTextPassword: string,
		hashedPassword: string,
	): Promise<boolean> {
		const isPasswordMatching = await bcrypt.compare(
			plainTextPassword,
			hashedPassword,
		);
		return isPasswordMatching;
	}

	async validateUser(
		login_id: string,
		password: string,
	): Promise<PasswordOmitUsers | null> {
		const user = await this.getUser(login_id);

		if (user && (await this.verifyPassword(password, user.password))) {
			const { password: _password, ...result } = user;
			return result;
		}
		return null;
	}

	async signUp(signUpInput: SignUpInput): Promise<string> {
		const { login_id, password } = signUpInput;

		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(password, salt);

		const newUser = await this.prismaService.users.create({
			data: {
				id: uuidv7(),
				login_id,
				password: hashPassword,
			},
		});

		return newUser.id;
	}

	// TODO: サインインの処理で何を返すか検討
	async signIn(_user: PasswordOmitUsers): Promise<string> {
		return 'access_token';
	}

	/**
	 * ユーザーがパートナーを持っているかどうか判定
	 * @param user_id
	 * @returns
	 */
	async searchCharactersFromDB(user_id: string): Promise<boolean> {
		let isCharacterExists = false;
		const characters = await this.prismaService.charactersUsers.findFirst({
			where: {
				user_id,
			},
		});

		// charactersが空の場合、isCharacterExistsをfalseにする
		if (characters) isCharacterExists = true;

		return isCharacterExists;
	}
}
