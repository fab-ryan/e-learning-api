import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DbModule, I18nConfigModule } from '@/configs';
import { UserModule, DefaultModule } from './modules';
import { LanguageMiddleware } from '@/middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mails/mail.module';
import { CategoryModule } from './modules/category/category.module';
import { UserCategoryModule } from './modules/user-category/user-category.module';

@Module({
  imports: [
    DefaultModule,
    I18nConfigModule,
    DbModule,
    UserModule,
    AuthModule,
    MailModule,
    CategoryModule,
    UserCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageMiddleware).forRoutes('*');
  }
}
