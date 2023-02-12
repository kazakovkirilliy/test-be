import { InputType, Field } from '@nestjs/graphql';
import {
  IsAlpha,
  IsAlphanumeric,
  IsOptional,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlphanumeric()
  @MinLength(5, {
    message: 'Username must be at least $constraint1 characters long',
  })
  @Field(() => String)
  username: string;

  @MinLength(5, {
    message: 'Password must be at least $constraint1 characters long',
  })
  @Field(() => String)
  password: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => String)
  firstName: string;

  @IsOptional()
  @Field(() => String)
  lastName: string;

  @IsOptional()
  @Field(() => String)
  email: string;

  @IsOptional()
  @Field(() => Number)
  age: number;

  @Field(() => String, { nullable: true })
  imageUrl?: string;
}
