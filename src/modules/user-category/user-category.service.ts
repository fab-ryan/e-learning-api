import { Injectable } from '@nestjs/common';
import { CreateUserCategoryDto } from './dto/create-user-category.dto';
import { UserCategory } from './entities/user-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseService } from '@/utils';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';
import { AuthUserType } from '@/guards';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class UserCategoryService {
  constructor(
    @InjectRepository(UserCategory)
    private userCategoryRepository: Repository<UserCategory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly responseService: ResponseService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}
  async create({
    categoryId,
    id: userId,
  }: CreateUserCategoryDto & AuthUserType) {
    try {
      for (const id of categoryId) {
        const category = await this.categoryRepository.findOne({
          where: { id },
        });
        if (!category) {
          return this.responseService.Response({
            data: null,
            message: await this.i18n.t(
              'validation.USER_CATEGORY_REGISTER.CATEGORY_NOT_FOUND',
            ),
            success: false,
            key: 'category',
          });
        }

        const user = await this.userRepository.findOne({
          where: { id: userId },
        });
        const userCategory = this.userCategoryRepository.create({
          user: user,
          category,
        });
        await this.userCategoryRepository.save(userCategory);
      }
      const userCategory = await this.userCategoryRepository.find({
        where: { user: { id: userId } },
        relations: ['category'],
      });
      return this.responseService.Response({
        data: userCategory,
        message: 'User category created successfully',
        success: true,
        key: 'userCategories',
        statusCode: 201,
      });
    } catch (e) {
      const errorMsg = (e as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: 'Failed to create user category',
        success: false,
        key: 'userCategory',
      });
    }
  }

  async findAll({ userId }: { userId: string }) {
    try {
      const userCategories = await this.userCategoryRepository.find({
        where: { user: { id: userId } },
        relations: ['category'],
      });
      return this.responseService.Response({
        data: userCategories,
        message: 'User categories fetched successfully',
        success: true,
        key: 'userCategories',
      });
    } catch (e) {
      const errorMsg = (e as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: 'Failed to fetch user categories',
        success: false,
        key: 'userCategories',
      });
    }
  }

  async remove({ id }: { id: string }) {
    try {
      await this.userCategoryRepository.softDelete(id);
      return this.responseService.Response({
        data: null,
        message: 'User category deleted successfully',
        success: true,
        key: 'userCategory',
      });
    } catch (e) {
      const errorMsg = (e as Error).message;
      return this.responseService.Response({
        data: errorMsg,
        message: 'Failed to delete user category',
        success: false,
        key: 'userCategory',
      });
    }
  }
}
