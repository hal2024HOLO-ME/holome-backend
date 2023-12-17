import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [PrismaModule, CharacterService],
	controllers: [CharacterController],
	exports: [CharacterService],
})
export class CharacterModule {}
