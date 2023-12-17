import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { CharacterModule } from './character/character.module';

@Module({
	imports: [PrismaModule, AuthModule, DiagnosisModule, CharacterModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
