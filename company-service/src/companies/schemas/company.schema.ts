import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as dbSchema } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ type: dbSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);