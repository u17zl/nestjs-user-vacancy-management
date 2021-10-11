import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { User } from '@@users/models/user.model';
import { Vacancy } from '@@vacancies/models/vacancy.model';

@ObjectType({ description: 'Company' })
export class Company {
  @Field((type) => String)
  _id: Types.ObjectId;

  @Field((type) => String, { nullable: false })
  name: string;

  @Field((type) => String)
  address: string;

  @Field((type) => [User])
  users: User[];

  @Field((type) => [Vacancy], { nullable: 'items' })
  vacancies: Vacancy[];
}
