import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './api/articles/article/article.module';
import { ConfigModule } from '@nestjs/config';
import { ModerationModule } from './api/articles/moderation/moderation.module';
import { AdministrationModule } from './api/articles/administration/administration.module'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    ArticleModule,
    ModerationModule,
    AdministrationModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
