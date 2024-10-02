import { Module } from '@nestjs/common';
import { ModerationController } from './moderation.controller';
import { ModerationService } from './moderation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Moderation, ModerationSchema } from './moderation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Moderation.name, schema: ModerationSchema }]),
  ],
  controllers: [ModerationController],
  providers: [ModerationService],
})
export class ModerationModule {}
