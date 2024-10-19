import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnalystDocument = HydratedDocument<Analyst>;

@Schema()
export class Analyst {
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

  @Prop()
  evidence: string;


  @Prop()
  claim: string;


  @Prop({ type: Date, default: Date.now })
  updated_date: Date;
}

export const AnalystSchema = SchemaFactory.createForClass(Analyst);
