import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModerationDocument = HydratedDocument<Moderation>;

@Schema()
export class Moderation {
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
  created_date: Date; 
}

export const ModerationSchema = SchemaFactory.createForClass(Moderation);
