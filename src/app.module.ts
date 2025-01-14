import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateAdminHandler } from './application/admin/commands/create-admin/create-admin.handler';
import { PatchAdminHandler } from './application/admin/commands/patch-admin/patch-admin.handler';
import { FindAllAdminHandler } from './application/admin/queries/find-all/find-all.handler';
import { LoginAdminHandler } from './application/auth/queries/auth-admin/login-admin.handler';
import { RefreshTokensHandler } from './application/auth/queries/refresh-tokens/refresh-tokens.handler';
import { JwtAdapter } from './infrastructure/adapters/jwt.adapter';
import { PrismaService } from './infrastructure/config/prisma.service';
import { AdminRepository } from './infrastructure/persistence/repositories/admin.repository';
import { RefreshTokenRepository } from './infrastructure/persistence/repositories/auth/refresh-token.repository';
import { AdminController } from './presentation/controllers/admin.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.prod'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController, AdminController],
  providers: [
    AppService,
    PrismaService,
    CreateAdminHandler,
    PatchAdminHandler,
    FindAllAdminHandler,
    {
      provide: 'IAdminRepository',
      useClass: AdminRepository,
    },
    LoginAdminHandler,
    {
      provide: 'IAuthPort',
      useClass: JwtAdapter,
    },
    JwtAdapter,
    {
      provide: 'IRefreshTokenRepository',
      useClass: RefreshTokenRepository,
    },
    RefreshTokensHandler,
  ],
})
export class AppModule {}
