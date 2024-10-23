import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdministrationDocument = HydratedDocument<Administration>;

@Schema()
export class Administration {
    @Prop({ required: true })
    title: string;
  
    @Prop({ required: true })
    authors: string;
  
    @Prop({ required: true })
    source: string;
  
    @Prop({ required: true})
    doi: string;
  
    @Prop({ type: Date })
    pubyear: Date;
  
    @Prop()
    practice: string;
    
    @Prop({ type: Date, default: Date.now })
    updated_date: Date;
}

export const AdministrationSchema = SchemaFactory.createForClass(Administration);
