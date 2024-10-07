import { Date } from 'mongoose';

export class CreateArticleDto {
  title: string;
  authors: string;
  source: string;
  doi: string;
  pubyear: Date;
  claim: string;
  evidence: string;
  updated_date: Date;
}
