import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  AssociativeArray,
  filterQueryBuilderFromRequest,
  ResponseService,
} from '@/utils';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';
import * as bcrypt from 'bcrypt';
<<<<<<< HEAD
import { RolesEnum as Roles } from '@/enums';
=======
import { Roles } from '@/enums';
>>>>>>> 327280f (stoping to auth unthentication)
import { PaginateHelper } from '@/utils/paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly responseService: ResponseService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly userPagination: PaginateHelper<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const lang = I18nContext.current().lang;
      const { email, password, phone, username, role } = createUserDto;
      const isEmailExists = await this.emailExists(email);
      const isUsernameExists = await this.usernameExists(
        this.formatUsername(username),
      );
      if (isUsernameExists) {
        return this.responseService.Response({
          data: null,
          message: await this.i18n.t('validation.USER_REGISTER.EMAIL_EXISTS', {
            lang,
          }),
        });
      }
      if (isEmailExists) {
        return this.responseService.Response({
          data: null,
          message: await this.i18n.t('validation.USER_REGISTER.EMAIL_EXISTS', {
            lang,
          }),
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const UserRole = Roles[role];
      const user = this.userRepository.create({
        ...createUserDto,
<<<<<<< HEAD
        phone,
        username: this.formatUsername(username),
=======
        username: this.formatUsername(username),
        phone,
>>>>>>> 327280f (stoping to auth unthentication)
        password: hashedPassword,
        role: UserRole,
      });

      await this.userRepository.save(user);
      return this.responseService.Response({
        data: user,
        key: 'users',
        message: await this.i18n.t('validation.USER_REGISTER.USER_SUCCESS', {
          lang,
        }),
      });
    } catch (error) {
      const errorMsg = (error as Error).message;
      const lang = I18nContext.current().lang;
      return this.responseService.Response({
        data: errorMsg,
        message: await this.i18n.t('validation.USER_REGISTER.USER_FAIL', {
          lang,
        }),
      });
    }
  }

  async findAll(filters?: AssociativeArray) {
    try {
      const q = this.userRepository
        .createQueryBuilder('users')
        .select([
          'users.id',
          'users.name',
          'users.username',
          'users.email',
          'users.phone',
          'users.status',
          'users.created_at',
          'users.role',
          'users.deleted_at',
        ])
        .orderBy('users.created_at', 'DESC');
      filterQueryBuilderFromRequest(q, filters);

      const users = await this.userPagination.run(q);
      return this.responseService.Response({
        data: users,
        key: 'users',
        message: 'Users fetched successfully',
      });
    } catch (error) { }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        withDeleted: true,
      });
      return this.responseService.Response({
        data: user,
        key: 'users',
        message: 'User fetched successfully',
      });
    } catch (error) {
      return this.responseService.Response({
        data: null,
        message: 'User not found',
      });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        withDeleted: true,
      });
      if (!user) {
        return this.responseService.Response({
          data: null,
          message: 'User not found',
        });
      }
      const updatedUser = await this.userRepository.save({
        ...user,
        ...updateUserDto,
      });
      return this.responseService.Response({
        data: updatedUser,
        key: 'users',
        message: 'User updated successfully',
      });
    } catch (error) {
      return this.responseService.Response({
        data: null,
        message: 'User not updated',
      });
    }
  }

  async remove(id: string) {
    try {
      await this.userRepository.softDelete(id);
      return this.responseService.Response({
        data: null,
        message: 'User deleted successfully',
      });
    } catch (error) {
      return this.responseService.Response({
        data: null,
        message: 'User not deleted',
      });
    }
  }

  async emailExists(email: string): Promise<boolean> {
    const exists = await this.userRepository.exists({
      where: { email },
      withDeleted: true,
    });
    return exists;
  }

  async usernameExists(username: string): Promise<boolean> {
    const exists = await this.userRepository.exists({
      where: { username },
      withDeleted: true,
    });
    return exists;
  }

  formatUsername(name: string): string {
    if (!name) return '';
    return name
      .replace(/' '/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '')
      .replace(/\s/g, '')
      .toLowerCase();
  }

  async userDetail(id: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      withDeleted: true,
    });
    return user;
  }
}
