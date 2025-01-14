import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateAdminHandler } from 'src/application/admin/commands/create-admin/create-admin.handler';
import { PatchAdminHandler } from 'src/application/admin/commands/patch-admin/patch-admin.handler';
import { FindAllAdminHandler } from 'src/application/admin/queries/find-all/find-all.handler';
import { LoginAdminHandler } from 'src/application/auth/queries/auth-admin/login-admin.handler';
import { RefreshTokensHandler } from 'src/application/auth/queries/refresh-tokens/refresh-tokens.handler';
import { CreateAdminDto } from '../data/dto/create-admin.dto';
import { LoginAdminDto } from '../data/dto/login-admin.dto';
import { PatchAdminDto } from '../data/dto/patch-admin.dto';
import { FiltersExceptions } from '../filters/exceptions.filter';
import { AdminAuthGuard } from '../guards/admin/admin-auth.guard';

@Controller('admin')
@UseFilters(FiltersExceptions)
export class AdminController {
  constructor(
    private readonly createAdminHandler: CreateAdminHandler,
    private readonly loginAdminHandler: LoginAdminHandler,
    private readonly refreshTokensHandler: RefreshTokensHandler,
    private readonly patchAdminHandler: PatchAdminHandler,
    private readonly findAllAdminHandler: FindAllAdminHandler,
  ) {}

  @Post()
  async createAdmin(@Body() body: CreateAdminDto) {
    console.log('BODY IN CTRL', body);
    const successMessage = await this.createAdminHandler.execute(body);
    console.log('SUCCESS MESSAGE IN CTRL', successMessage);
    return {
      statusCode: 201,
      message: successMessage,
    };
  }

  @Post('login')
  async loginAdmin(@Body() body: LoginAdminDto) {
    const data = await this.loginAdminHandler.execute(body);
    console.log(data);
    return {
      statusCode: 200,
      data,
    };
  }

  @UseGuards(AdminAuthGuard)
  @Get('auth/verify')
  async verifyAdmin(@Req() request: Request) {
    return {
      statusCode: 200,
    };
  }

  @UseGuards(AdminAuthGuard)
  @Get('all')
  async findAllAdmin() {
    const data = await this.findAllAdminHandler.execute();
    return {
      statusCode: 200,
      data,
    };
  }

  @Post('auth/refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    console.log('BODY IN CTRL', body);
    const data = await this.refreshTokensHandler.execute({
      token: body.refreshToken,
    });
    console.log('DATA IN CTRL', data);
    return {
      statusCode: 200,
      data,
    };
  }

  @UseGuards(AdminAuthGuard)
  @Patch(':id')
  async patchAdmin(@Param('id') id: string, @Body() body: PatchAdminDto) {
    console.log('ID IN CTRL', id);
    console.log('BODY IN CTRL', body);
    const data = await this.patchAdminHandler.execute({
      id,
      key: body.key,
      value: body.value,
      prevPassword: body.prevPassword,
    });
    return {
      statusCode: 200,
      data,
    };
  }
}
