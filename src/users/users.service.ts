import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { DeleteUserInput } from './dto/delete-user-input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    return await this.prisma.user.create({
      data: {
        ...createUserInput,
        name: createUserInput.firstName + ' ' + createUserInput.lastName,
      },
    });
  }

  async delete(input: string) {
    return await this.prisma.user.delete({
      where: {
        username: input,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findMe(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async update(id: string, data: UpdateUserInput) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
