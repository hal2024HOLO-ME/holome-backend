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

	async signUp(signUpInput: SignUpInput): Promise<Users> {
		const { login_id, password } = signUpInput;

		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(password, salt);

		return await this.prismaService.users.create({
			data: {
				id: uuidv7(),
				login_id,
				password: hashPassword,
			},
		});
	}

	// TODO: サインインの処理で何を返すか検討
	async signIn(_user: PasswordOmitUsers): Promise<string> {
		return 'access_token';
	}
}
