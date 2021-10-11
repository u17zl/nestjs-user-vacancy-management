import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Company } from '@@companies/models/company.model';
import { Types } from 'mongoose';

export enum Roles {
  admin = 'admin',
  user = 'user',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'Admin can CRUD vacancies, user can read vacancies',
});

@ObjectType({ description: 'User' })
export class User {
  @Field((type) => String)
  _id: Types.ObjectId;

  @Field((type) => String)
  name: string;

  @Field((type) => String, { nullable: false })
  username: string;

  @Field((type) => Roles, { defaultValue: Roles.admin, nullable: false })
  role: string;

  @Field((type) => String)
  companyId: Types.ObjectId;

  @Field((type) => Company)
  company: Company;
}

@ObjectType({ description: 'Access token' })
export class AccessToken {
  @Field((type) => String)
  accessToken: string;
}
