import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { CreateArticleDto } from '../create-article.dto';

@Controller('api/moderation') 
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

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
