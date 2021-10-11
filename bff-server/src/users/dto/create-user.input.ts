import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Roles } from '@@users/models/user.model';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field((type) => Roles, { defaultValue: Roles.admin, nullable: true })
  role: Roles;

  @Field((type) => String)
  companyId: Types.ObjectId;
}
