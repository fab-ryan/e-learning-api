import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Version,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiTags,
  ApiAcceptedResponse,
  ApiConsumes,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storage } from '@/utils';
import { AuthGuard } from '@/guards';
import { Roles } from '@/decorators';
import { RolesEnum } from '@/enums';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.INSTRUCTOR)
  @Post()
  @Version('1')
  @ApiConsumes('multipart/form-data')
  @ApiAcceptedResponse({
    description: 'The record has been successfully created.',
    type: CreateCategoryDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'icon_url',
          maxCount: 1,
        },
      ],
      { storage: storage('category') },
    ),
  )
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles()
    files: {
      icon_url: Express.Multer.File;
    },
  ) {
    return this.categoryService.create(createCategoryDto, files);
  }

  @ApiQuery({
    name: 'status',
    required: false,
    type: Boolean,
    description: 'Filter by status',
  })
  @Get()
  findAll(@Query('status') status: boolean | string | undefined) {
    return this.categoryService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.findOne(id);
  }

  @Version('1')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'icon_url',
          maxCount: 1,
        },
      ],
      { storage: storage('/category') },
    ),
  )
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFiles()
    files: {
      icon_url: Express.Multer.File;
    },
  ) {
    return this.categoryService.update(id, updateCategoryDto, files);
  }

  @ApiTags('category')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.remove(id);
  }

  @ApiTags('category')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string) {
    return this.categoryService.changeStatus(id);
  }
}
