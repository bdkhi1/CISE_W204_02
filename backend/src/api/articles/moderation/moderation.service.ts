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

  async findAll(): Promise<Moderation[]> {
    return await this.moderationModel.find().exec();
  }
  
  async findOne(id: string): Promise<Moderation> {
    return await this.moderationModel.findById(id).exec();
  }

  async create(createArticleDto: CreateArticleDto) {
    return await this.moderationModel.create(createArticleDto);
  }
}
