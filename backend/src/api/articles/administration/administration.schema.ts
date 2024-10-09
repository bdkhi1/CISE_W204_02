import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdministrationDocument = HydratedDocument<Administration>;

@Schema()
export class Administration {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: Date, default: Date.now })
  created_date: Date;

  @Prop({ type: Date })
  updated_date: Date;
}

export const AdministrationSchema = SchemaFactory.createForClass(Administration);
