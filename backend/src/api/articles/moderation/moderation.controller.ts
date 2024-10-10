import { Body, Controller, Post, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { CreateArticleDto } from '../article/create-article.dto';
import { error } from 'console';

@Controller('api/moderation') 
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

    // Get all articles
    @Get('/')
    async findAll() {
      try {
        return this.moderationService.findAll();
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No Articles found',
          },
          HttpStatus.NOT_FOUND,
          { cause: error },
        );
      }
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
      try {
        return this.moderationService.findOne(id);
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No Article found',
          },
          HttpStatus.NOT_FOUND,
          { cause: error },
        );
      }
    }

  @Post('/')
  async addModerationArticle(@Body() createArticleDto: CreateArticleDto) {
    try {
      await this.moderationService.create(createArticleDto);
      return { message: 'Article sent to moderation successfully' };
    } catch (error) {
      console.error('Error in adding moderation article:', error); 
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to send this article to moderation',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
