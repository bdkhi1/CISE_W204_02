import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModerationController } from './moderation.controller';
import { ModerationService } from './moderation.service';
import { Moderation, ModerationSchema } from './moderation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Moderation.name, schema: ModerationSchema }]),
  ],
  controllers: [ModerationController],
  providers: [ModerationService],
})
export class ModerationModule {}
