import { InputType, Field } from '@nestjs/graphql';
import {
  IsAlpha,
  IsAlphanumeric,
  IsOptional,
  MinLength,
} from 'class-validator';

@InputType()
export class DeleteUserInput {
  @IsAlphanumeric()
  @MinLength(5, {
    message: 'Username must be at least $constraint1 characters long',
  })
  @Field(() => String)
  username: string;
}
