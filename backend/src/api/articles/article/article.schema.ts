import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string;

  @Prop({ required: true })
  source: string;

  @Prop()
  doi: string;

  @Prop({ type: Date })
  pubyear: Date;

  @Prop()
  practice: string;
  
  @Prop({ type: Date, default: Date.now })
  updated_date: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
