import { InputType, Field, OmitType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CreateVacancyInput } from './create-vacancy.input';

@InputType()
export class UpdateVacancyInput extends OmitType(CreateVacancyInput, [
  'companyId',
] as const) {
  @Field((type) => String, { nullable: false })
  _id: Types.ObjectId;
}
