import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as dbSchema } from 'mongoose';

export type VacancyDocument = Vacancy & Document;

@Schema()
export class Vacancy {
  @Prop({ type: dbSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ type: dbSchema.Types.ObjectId, ref: 'Company', required: true })
  companyId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date })
  expiredAt: Date;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);