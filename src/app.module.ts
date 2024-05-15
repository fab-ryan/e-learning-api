import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DbModule, I18nConfigModule } from '@/configs';
import { UserModule, DefaultModule } from './modules';
import { LanguageMiddleware } from '@/middlewares';

@Module({
  imports: [DefaultModule, I18nConfigModule, DbModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageMiddleware).forRoutes('*');
  }
}
