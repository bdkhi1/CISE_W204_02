import { Body, Controller, Post, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AdministrationService } from './administration.service';
import { CreateArticleDto } from '../article/create-article.dto';

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
}
