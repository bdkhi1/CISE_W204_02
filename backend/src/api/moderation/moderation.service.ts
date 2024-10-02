import { Injectable } from '@nestjs/common';
import { Moderation } from './moderation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ModerationService {
  constructor(@InjectModel(Moderation.name) private moderationModel: Model<Moderation>) {}

  test(): string {
    return 'article route testing';
  }

  async findAll(): Promise<Moderation[]> {
    return await this.moderationModel.find().exec();
  }

}
