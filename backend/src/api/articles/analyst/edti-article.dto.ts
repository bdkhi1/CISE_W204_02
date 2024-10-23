import { Date } from 'mongoose';

export class EditArticleDto {
  title: string;
  authors: string;
  source: string;
  doi: string;
  pubyear: Date;
  practice: string;
  evidence: string;
  claim: string;
  updated_date: Date;
}
