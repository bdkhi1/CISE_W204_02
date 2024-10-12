import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administration } from './administration.schema';
import { CreateArticleDto } from '../article/create-article.dto';

@Injectable()
export class AdministrationService {
  constructor(
    @InjectModel(Administration.name) private administrationModel: Model<Administration>,
  ) {}

  async create(createAdministrationDto: CreateArticleDto) {
    return await this.administrationModel.create(createAdministrationDto);
  }

  async findAll(): Promise<Administration[]> {
    return await this.administrationModel.find().exec();
  }

  async delete(id: string) {
    const deletedArticle = await this.administrationModel.findByIdAndDelete(id).exec();
    return deletedArticle;
  }
}