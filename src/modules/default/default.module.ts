import { ResponseService } from '@/utils';
import { Controller, Get, Injectable, Module } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { I18nTranslations } from '@/generated';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class DefaultService {
  constructor(
    private readonly responseService: ResponseService,
    private readonly I18nService: I18nService<I18nTranslations>,
  ) {}
  getHello() {
    const lang = I18nContext.current().lang;
    return this.responseService.Response({
      success: true,
      statusCode: 200,
      data: {
        message: this.I18nService.translate('response.DEFAULT_MESSAGE', {
          lang,
        }),
      },
      message: this.I18nService.translate('response.DEFAULT_MESSAGE', { lang }),
    });
  }
}

@Controller('/')
@ApiTags('App')
class AppController {
  constructor(private readonly DefaultService: DefaultService) {}
  @Get()
  getHello() {
    return this.DefaultService.getHello();
  }
}

@Module({
  controllers: [AppController],
  providers: [ResponseService, DefaultService],
})
export class DefaultModule {}
