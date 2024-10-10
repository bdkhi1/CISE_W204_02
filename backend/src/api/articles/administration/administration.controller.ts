import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AdministrationService } from './administration.service';
import { CreateArticleDto } from '../create-article.dto';

@Controller('api/administration') 
export class AdministrationController {
  constructor(private readonly administrationService: AdministrationService) {}

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
}
