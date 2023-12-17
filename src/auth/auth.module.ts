import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [PrismaModule, AuthService],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
