import { Date } from 'mongoose';

export class CreateArticleDto {
  title: string;
  authors: string;
  source: string;
  doi: string;
  pubyear: Date;
  practice: string;
  updated_date: Date;
}
