import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, FilesDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { removeFile, ResponseService } from '@/utils';
import { I18nTranslations } from '@/generated';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly responseService: ResponseService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}
  /*
   *Create Category function
   */
  async create(createCategoryDto: CreateCategoryDto, files: FilesDto) {
    try {
      const lang = I18nContext.current().lang;
      const categoryExist = await this.categoryExist(createCategoryDto.name);
      if (categoryExist) {
        removeFile(files.icon_url[0].filename);
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.CATEGORY.CATEGORY_EXIST', { lang }),
        });
      }
      const category = this.categoryRepository.create({
        name: createCategoryDto.name.toLowerCase(),
        description: createCategoryDto.description,
        icon_url: files.icon_url[0]?.filename as string,
        status: false,
      });
      await this.categoryRepository.save(category);
      return this.responseService.Response({
        data: category,
        message: this.i18n.t(
          'response.CATEGORY.CATEGORY_CREATED_SUCCESSFULLY',
          { lang },
        ),
        key: 'category',
        statusCode: 201,
        success: true,
      });
    } catch (e) {
      const errorMsg = (e as Error).message;
      const lang = I18nContext.current().lang;
      return this.responseService.Response({
        data: errorMsg,
        message: await this.i18n.t('validation.USER_REGISTER.USER_FAIL', {
          lang,
        }),
        success: false,
        key: 'categories',
      });
    }
  }

  async findAll(filter: boolean | string | null) {
    const lang = I18nContext.current().lang;
    const categories = await this.categoryRepository.find({
      where: filter ? { status: Boolean(filter) } : {},
    });
    return this.responseService.Response({
      data: categories,
      message: this.i18n.t('response.CATEGORY.CATEGORY_FETCH_SUCCESSFULLY', {
        lang,
      }),
    });
  }

  async findOne(id: string) {
    const lang = I18nContext.current().lang;
    try {
      const categoryExist = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!categoryExist) {
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.CATEGORY.CATEGORY_NOT_FOUND', {
            lang,
          }),
          success: false,
          statusCode: 404,
        });
      }
      const category = await this.categoryRepository.findOne({ where: { id } });
      return this.responseService.Response({
        data: category,
        message: this.i18n.t('response.CATEGORY.CATEGORY_FETCH_SUCCESSFULLY', {
          lang,
        }),
        key: 'category',
      });
    } catch (e) {
      const { message } = e as Error;
      return this.responseService.Response({
        data: null,
        message,
        success: false,
        statusCode: 500,
      });
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    files: FilesDto,
  ) {
    const lang = I18nContext.current().lang;
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.CATEGORY.CATEGORY_NOT_FOUND', {
            lang,
          }),
          success: false,
          statusCode: 404,
        });
      }
      if (files.icon_url) {
        removeFile(category.icon_url);
      }

      const updatedCategory = await this.categoryRepository.save({
        ...category,
        ...updateCategoryDto,
        icon_url: files
          ? (files.icon_url[0]?.filename as string)
          : category.icon_url,
      });
      return this.responseService.Response({
        data: updatedCategory,
        message: this.i18n.t(
          'response.CATEGORY.CATEGORY_UPDATED_SUCCESSFULLY',
          {
            lang,
          },
        ),
        key: 'category',
      });
    } catch (e) {
      const { message } = e as Error;
      return this.responseService.Response({
        data: null,
        message,
        success: false,
        statusCode: 500,
      });
    }
  }

  async remove(id: string) {
    try {
      const lang = I18nContext.current().lang;
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.CATEGORY.CATEGORY_NOT_FOUND', {
            lang,
          }),
          success: false,
          statusCode: 404,
        });
      }
      removeFile(category.icon_url);
      await this.categoryRepository.delete(id);
      return this.responseService.Response({
        data: null,
        message: this.i18n.t(
          'response.CATEGORY.CATEGORY_DELETED_SUCCESSFULLY',
          {
            lang,
          },
        ),
      });
    } catch (e) {
      const { message } = e as Error;
      return this.responseService.Response({
        data: null,
        message,
        success: false,
        statusCode: 500,
      });
    }
  }
  protected async categoryExist(name: string): Promise<boolean> {
    const exist = await this.categoryRepository.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });
    if (exist) {
      return true;
    }
    return false;
  }

  async changeStatus(id: string) {
    const lang = I18nContext.current().lang;
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        return this.responseService.Response({
          data: null,
          message: this.i18n.t('response.CATEGORY.CATEGORY_NOT_FOUND', {
            lang,
          }),
          success: false,
          statusCode: 404,
        });
      }
      const updatedCategory = await this.categoryRepository.save({
        ...category,
        status: !category.status,
      });
      return this.responseService.Response({
        data: updatedCategory,
        message: this.i18n.t(
          'response.CATEGORY.CATEGORY_STATUS_UPDATED_SUCCESSFULLY',
          {
            lang,
          },
        ),
        key: 'category',
      });
    } catch (e) {
      const { message } = e as Error;
      return this.responseService.Response({
        data: null,
        message,
        success: false,
        statusCode: 500,
      });
    }
  }
}
