import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateUserHandler } from 'src/application/user/commands/create-user/create-user.command';
import { CreateUserDto } from '../data/dto/create-user.dto';
import { FiltersExceptions } from '../filters/exceptions.filter';
import { USER_ROUTES } from '../routes';

@Controller(USER_ROUTES.BASE)
@UseFilters(FiltersExceptions)
export class UserController {
  constructor(private readonly createUserHandler: CreateUserHandler) {}

  @Post(USER_ROUTES.CREATE)
  async createUser(@Body() body: CreateUserDto) {
    const userId = await this.createUserHandler.execute(body);
    return {
      statusCode: 201,
      message: 'Vous venez de créer votre compte',
      userId,
    };
  }
}
