import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { I18nConfigModule } from '@/configs';
import { UserModule, DefaultModule } from './modules';
import { LanguageMiddleware } from '@/middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mails/mail.module';
import { CategoryModule } from './modules/category/category.module';
import { UserCategoryModule } from './modules/user-category/user-category.module';
import { CoursesModule } from './modules/courses/courses.module';
import { SharedModule } from './shared';
import { PrometheusModule } from './prometheus/prometheus.module';

@Module({
  imports: [
    SharedModule,
    DefaultModule,
    I18nConfigModule,
    UserModule,
    AuthModule,
    MailModule,
    CategoryModule,
    UserCategoryModule,
    CoursesModule,
    PrometheusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageMiddleware).forRoutes('*');
  }
}
