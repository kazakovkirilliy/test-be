// is used to validate if a user is in a database, if his login credentials are valid

import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { RegisterUserInput } from './dto/register-user.input';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UserInputError('Username or password is not correct');
    }

    const passwordMatches = await argon2.verify(user.password, password);

    if (passwordMatches) {
      const { password, ...rest } = user;
      return rest;
    }

    throw new UserInputError('Username or password is not correct');
  }

  login(user: User): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }

  async register(registerUserInput: RegisterUserInput): Promise<string> {
    const hashedPassword = await argon2.hash(registerUserInput.password);
    const existingUser = await this.usersService.findOne(
      registerUserInput.username,
    );

    if (existingUser) {
      throw new UserInputError('Username is taken');
    }

    const user = await this.usersService.create({
      ...registerUserInput,
      password: hashedPassword,
    });

    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }
}
