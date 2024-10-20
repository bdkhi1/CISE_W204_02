import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleDto } from './article-test.dto';
import { Article } from './article-test.interface';

@Injectable()
export class AppService {
  private articles: Article[] = [
    {
      id: '1',
      title: 'Original Title',
      authors: 'Original Author',
      pubyear: 2023,
      source: 'Original Source',
      doi: 'Original DOI',
      practice: 'Original Practice',
      evidence: 'Original Evidence',
      claim: 'Original Claim'
    },
  ];

  // Method for submitting a new article
  async submitArticle(articleDto: ArticleDto): Promise<Article> {
    const newId = (this.articles.length + 1).toString();

    const newArticle: Article = {
      id: newId,
      title: articleDto.title,
      authors: articleDto.authors,
      pubyear: articleDto.pubyear,
      source: articleDto.source || null,
      doi: articleDto.doi || null,
      practice: articleDto.practice || null,
      evidence: articleDto.evidence || null,
      claim: articleDto.claim || null
    };

    this.articles.push(newArticle);
    return newArticle;
  }

  // Method for updating an existing article
  async updateArticle(id: string, articleDto: ArticleDto): Promise<Article> {
    const articleIndex = this.articles.findIndex(article => article.id === id);
    if (articleIndex === -1) {
      throw new NotFoundException('Article not found');
    }

    const updatedArticle: Article = {
      ...this.articles[articleIndex],
      title: articleDto.title,
      authors: articleDto.authors,
      pubyear: articleDto.pubyear,
      source: articleDto.source || this.articles[articleIndex].source,
      doi: articleDto.doi || this.articles[articleIndex].doi,
      practice: articleDto.practice || this.articles[articleIndex].practice,
      evidence: articleDto.evidence || this.articles[articleIndex].evidence,
      claim: articleDto.claim || this.articles[articleIndex].claim
    };

    this.articles[articleIndex] = updatedArticle;
    return updatedArticle;
  }

  // Method for deleting an article
  async deleteArticle(id: string): Promise<void> {
    const articleIndex = this.articles.findIndex(article => article.id === id);
    if (articleIndex === -1) {
      throw new NotFoundException('Article not found');
    }
    this.articles.splice(articleIndex, 1);
  }
}