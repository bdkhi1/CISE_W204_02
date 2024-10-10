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
}
