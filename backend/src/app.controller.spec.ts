import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleDto } from './article-test.dto'; // Adjust the path as needed

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);

    // Mock articles data
    appService['articles'] = [
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
  });

  describe('submitArticle', () => {
    it('should submit an article as a submitter', async () => {
      const articleDto: ArticleDto = {
        title: 'New Title',
        authors: 'New Author',
        pubyear: 2024,
        source: 'New Source',
        doi: 'New DOI',
        practice: 'New Practice',
        evidence: 'New Evidence',
        claim: 'New Claim',
      };

      const submittedArticle = await appController.submitArticle(articleDto);

      // Ensure the returned article matches the submitted one
      expect(submittedArticle.title).toBe('New Title');
      expect(submittedArticle.authors).toBe('New Author');
      expect(submittedArticle.pubyear).toBe(2024);
      expect(submittedArticle.source).toBe('New Source');
      expect(submittedArticle.doi).toBe('New DOI');
      expect(submittedArticle.practice).toBe('New Practice');
      expect(submittedArticle.evidence).toBe('New Evidence');
      expect(submittedArticle.claim).toBe('New Claim');
      expect(appService['articles'].length).toBe(2);
    });
  });

  describe('updateArticle', () => {
    it('should update an article and ensure evidence and claim fields are filled', async () => {
      const articleDto: ArticleDto = {
        title: 'Updated Title',
        authors: 'Updated Author',
        pubyear: 2024,
        source: 'Updated Source',
        doi: 'Updated DOI',
        practice: 'Updated Practice',
        evidence: 'Updated Evidence', 
        claim: 'Updated Claim', 
      };

      // Update the article with id '1'
      const updatedArticle = await appController.updateArticle('1', articleDto);
      
      // The returned article has updated values
      expect(updatedArticle.title).toBe('Updated Title');
      expect(updatedArticle.authors).toBe('Updated Author');
      expect(updatedArticle.pubyear).toBe(2024);
      expect(updatedArticle.source).toBe('Updated Source');
      expect(updatedArticle.doi).toBe('Updated DOI');
      expect(updatedArticle.practice).toBe('Updated Practice');
      expect(updatedArticle.evidence).toBe('Updated Evidence'); 
      expect(updatedArticle.claim).toBe('Updated Claim'); 
    });

    it('should throw an error if the article is not found', async () => {
      const articleDto: ArticleDto = {
        title: 'Updated Title',
        authors: 'Updated Author',
        pubyear: 2024,
        evidence: 'Evidence', 
        claim: 'Claim',
      };

      await expect(appController.updateArticle('nonexistent-id', articleDto)).rejects.toThrow('Article not found');
    });
  });

  describe('deleteArticle', () => {
    it('should allow a moderator to reject an article', async () => {
      await appController.deleteArticle('1');
      
      expect(appService['articles'].find(article => article.id === '1')).toBeUndefined();
    });

    it('should throw an error if trying to delete a nonexistent article', async () => {
      await expect(appController.deleteArticle('nonexistent-id')).rejects.toThrow('Article not found');
    });
  });
});
