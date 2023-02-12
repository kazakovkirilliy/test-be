import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { LoginUserInput } from './login-user.input';

@InputType()
export class RegisterUserInput extends LoginUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  age: number;
}
