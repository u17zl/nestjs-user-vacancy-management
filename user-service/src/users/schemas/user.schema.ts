import { Prop, Schema, SchemaFactory, getModelToken } from '@nestjs/mongoose';
import { Document, Schema as dbSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: dbSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ type: dbSchema.Types.ObjectId, ref: 'Company' })
  companyId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ select: false, required: true })
  password: string;

  @Prop({
    enum: ['admin', 'user'],
    required: [true, 'A user must have a role'],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);