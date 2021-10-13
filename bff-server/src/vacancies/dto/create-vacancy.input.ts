import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreateVacancyInput {
  @Field(() => String)
  companyId!: Types.ObjectId;

  @Field()
  title!: string;

  @Field({nullable: true})
  description: string;

  @Field(() => Date, {nullable: true})
  expiredAt?: Date;
}