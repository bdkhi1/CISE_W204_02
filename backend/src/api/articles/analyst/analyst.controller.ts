import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AnalystService } from './analyst.service';
import { CreateArticleDto } from '../article/create-article.dto'; 

@Controller('api/analyst') 
export class AnalystController {
  constructor(private readonly analystService: AnalystService) {}

  @Post('/')
  async addAnalystArticle(@Body() createAnalystDto: CreateArticleDto) {
    try {
      await this.analystService.create(createAnalystDto);
      return { message: 'Article sent to analyst successfully' };
    } catch (error) {
      console.error('Error in adding analyst article:', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to send this article to analyst',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
