import { Body, Controller, Post, Get, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { CreateArticleDto } from '../article/create-article.dto';

@Controller('api/moderation')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Post('/')
  async addModerationArticle(@Body() createAdministrationDto: CreateArticleDto) {
    try {
      await this.moderationService.create(createAdministrationDto);
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
  async getAllModerationArticles() {
    try {
      const articles = await this.moderationService.findAll();
      return articles;
    } catch (error) {
      console.error('Error fetching moderation articles:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Unable to fetch moderation articles',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id: string) {
    try {
      return await this.moderationService.delete(id);
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