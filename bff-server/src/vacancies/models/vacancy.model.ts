import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Company } from '@@companies/models/company.model';

@ObjectType({ description: 'Vacancy' })
export class Vacancy {
  @Field((type) => String)
  _id: Types.ObjectId;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  description: string;

  @Field((type) => Date)
  expiredAt?: Date;

  @Field((type) => String)
  companyId: Types.ObjectId;

  @Field((type) => Company)
  company: Company;
}
