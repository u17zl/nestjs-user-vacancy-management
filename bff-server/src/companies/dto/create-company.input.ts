import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
  @Field({ nullable: false })
  name: string;

  @Field()
  address: string;
}