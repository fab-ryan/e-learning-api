import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ResponseService } from '@/utils';
import { PaginateHelper } from '@/utils/paginate';
import { AuthenticateMiddleware } from '@/middlewares';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    AuthenticateMiddleware,
    JwtService,
    ResponseService,
    PaginateHelper,
  ],
  exports: [UserService],
})
export class UserModule { }
