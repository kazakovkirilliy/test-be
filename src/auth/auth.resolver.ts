import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Ctx } from 'src/types/context.type';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { GqlAuthGuard } from './gql-auth.guard';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput, // gql auth guard attach this input to the context
    @Context() context: Ctx,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => String)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    return await this.authService.register(registerUserInput);
  }
}
