import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserCategoryService } from './user-category.service';
import { CreateUserCategoryDto } from './dto/create-user-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, AuthUserType } from '@/guards';
import { AuthUser, Roles } from '@/decorators';
import { RolesEnum } from '@/enums';

@ApiTags('user-category')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Roles(RolesEnum.ADMIN, RolesEnum.USER)
@Controller('user-category')
export class UserCategoryController {
  constructor(private readonly userCategoryService: UserCategoryService) {}

  @Post()
  create(
    @Body() createUserCategoryDto: CreateUserCategoryDto,
    @AuthUser() user: AuthUserType,
  ) {
    const payload: CreateUserCategoryDto & AuthUserType = {
      ...createUserCategoryDto,
      ...user,
    };
    return this.userCategoryService.create(payload);
  }

  @Get()
  findAll(@AuthUser() user: AuthUserType) {
    return this.userCategoryService.findAll({
      userId: user.id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCategoryService.remove({ id });
  }
}
