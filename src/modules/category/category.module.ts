import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ResponseService } from '@/utils';
import { AuthenticateMiddleware } from '@/middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, AuthenticateMiddleware, ResponseService],
  exports: [CategoryService],
})
export class CategoryModule {}
