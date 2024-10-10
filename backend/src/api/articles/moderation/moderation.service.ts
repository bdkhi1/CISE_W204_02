import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Moderation } from './moderation.schema';
import { CreateArticleDto } from '../article/create-article.dto';

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel(Moderation.name) private moderationModel: Model<Moderation>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.moderationModel.create(createArticleDto);
  }
}
