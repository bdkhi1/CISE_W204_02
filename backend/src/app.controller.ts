import { Body, Controller, Post, Param, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDto } from './article-test.dto'; // Adjust path as needed

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // POST method to submit an article
  @Post('submit')
  async submitArticle(@Body() articleDto: ArticleDto) {
    return this.appService.submitArticle(articleDto);
  }

  // PUT method to update an article
  @Put('update/:id')
  async updateArticle(@Param('id') id: string, @Body() articleDto: ArticleDto) {
    return this.appService.updateArticle(id, articleDto);
  }

  // DELETE method to delete an article
  @Delete('delete/:id')
  async deleteArticle(@Param('id') id: string) {
    return this.appService.deleteArticle(id);
  }
}
