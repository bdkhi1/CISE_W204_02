import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './api/articles/article.module';
import { ConfigModule } from '@nestjs/config';
import { ModerationModule } from './api/articles/moderation/moderation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    ArticleModule,
    ModerationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
