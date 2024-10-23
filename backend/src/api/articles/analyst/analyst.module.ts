import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalystController } from './analyst.controller';
import { AnalystService } from './analyst.service';
import { Analyst, AnalystSchema } from './analyst.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Analyst.name, schema: AnalystSchema }]),
  ],
  controllers: [AnalystController],
  providers: [AnalystService],
})
export class AnalystModule {}
