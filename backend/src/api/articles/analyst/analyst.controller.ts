import { Body, Controller, Post, Get, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AnalystService } from './analyst.service';
import { CreateArticleDto } from '../article/create-article.dto';

@Controller('api/analyst')
export class AnalystController {
  constructor(private readonly administrationService: AnalystService) {}

  @Post('/')
  async addAdministrationArticle(@Body() createAdministrationDto: CreateArticleDto) {
    try {
      await this.administrationService.create(createAdministrationDto);
      return { message: 'Article sent to administration successfully' };
    } catch (error) {
      console.error('Error in adding administration article:', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to send this article to administration',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/')
  async getAllAdministrationArticles() {
    try {
      const articles = await this.administrationService.findAll();
      return articles;
    } catch (error) {
      console.error('Error fetching administration articles:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Unable to fetch administration articles',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id: string) {
    try {
      return await this.administrationService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No such article',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
}