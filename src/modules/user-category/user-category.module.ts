import { Module } from '@nestjs/common';
import { UserCategoryService } from './user-category.service';
import { UserCategoryController } from './user-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCategory } from './entities/user-category.entity';
import { AuthenticateMiddleware } from '@/middlewares';
import { ResponseService } from '@/utils';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCategory, User, Category])],
  controllers: [UserCategoryController],
  providers: [UserCategoryService, AuthenticateMiddleware, ResponseService],
  exports: [UserCategoryService],
})
export class UserCategoryModule {}
