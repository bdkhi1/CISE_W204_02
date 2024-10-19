import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Moderation } from './moderation.schema';
import { CreateArticleDto } from '../article/create-article.dto'; 

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel(Moderation.name) private moderatortModel: Model<Moderation>,
  ) {}

  async create(createAnalystDto: CreateArticleDto) {
    return await this.moderatortModel.create(createAnalystDto);
  }
  async findAll(): Promise<Moderation[]> {
    return await this.moderatortModel.find().exec();
  }

  async delete(id: string) {
    const deletedArticle = await this.moderatortModel.findByIdAndDelete(id).exec();
    return deletedArticle;
  }
}
