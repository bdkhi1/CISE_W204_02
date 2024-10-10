import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analyst } from './analyst.schema';
import { CreateArticleDto } from '../article/create-article.dto'; 

@Injectable()
export class AnalystService {
  constructor(
    @InjectModel(Analyst.name) private analystModel: Model<Analyst>,
  ) {}

  async create(createAnalystDto: CreateArticleDto) {
    return await this.analystModel.create(createAnalystDto);
  }
}
