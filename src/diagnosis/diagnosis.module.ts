import { Module } from '@nestjs/common';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisService } from './diagnosis.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [PrismaModule, DiagnosisService],
	controllers: [DiagnosisController],
	exports: [DiagnosisService],
})
export class DiagnosisModule {}
