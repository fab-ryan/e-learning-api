import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ProfileDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiQuery, ApiBearerAuth, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { AssociativeArray, storage } from '@/utils';
import { AuthGuard, AuthUserType } from '@/guards';
import { Roles, User } from '@/decorators';
import { RolesEnum } from '@/enums';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN)
  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  findAll(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() filters: AssociativeArray,
  ) {
    return this.userService.findAll(filters);
  }

  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {

  constructor(private readonly userService: UserService) { }
  @ApiOperation({ summary: 'Get user profile' })
  @ApiBearerAuth()
  @Roles(RolesEnum.ALL)
  @UseGuards(AuthGuard)
  @Get('')
  getProfile(@User() user: AuthUserType) {
    return this.userService.getProfile(user);
  }

  @Patch('profile')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'icon_url',
          maxCount: 1,
        },
      ],
      { storage: storage('/profile') },
    ),
  )
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @Roles(RolesEnum.ALL)
  @UseGuards(AuthGuard)
  updateProfile(@User() user: AuthUserType, @Body() updateUserDto: ProfileDto,
    @UploadedFiles()
    files: {
      profile_picture: Express.Multer.File;
    }) {
    return this.userService.updateProfile(updateUserDto, user, files);
  }

  @Get("/debug-sentry")
  getError() {
    throw new Error("My first Sentry error!");
  }
}
