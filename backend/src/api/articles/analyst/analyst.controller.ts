import { Body, Controller, Post, Get,Put, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AnalystService } from './analyst.service';
import { EditArticleDto } from './edti-article.dto';
import { CreateArticleDto } from '../article/create-article.dto';
import { error } from 'console';

@Controller('api/analyst')
export class AnalystController {
  constructor(private readonly administrationService: AnalystService) {}

  @Post('/')
  async addAdministrationArticle(@Body() createAdministrationDto: EditArticleDto) {
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

  @Put('/:id')
    async updateArticle(
      @Param('id') id: string,
      @Body() createArticleDto: CreateArticleDto,
    ) {
      try {
        await this.administrationService.update(id, createArticleDto);
        return { message: 'Article updated successfully' };
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Unable to update this article',
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      }
    }

    // Get one article via id
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      try {
        return this.administrationService.findOne(id);
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
}