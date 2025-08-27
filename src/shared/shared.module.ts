import { DbModule } from '@/configs';
import { AuthenticateMiddleware } from '@/middlewares';
import { ResponseService } from '@/utils';
import { PaginateHelper } from '@/utils/paginate';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';

@Global()
@Module({
  imports: [DbModule, SentryModule.forRoot()],
  controllers: [],
  providers: [
    ResponseService,
    AuthenticateMiddleware,
    PaginateHelper,
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
  exports: [ResponseService, AuthenticateMiddleware, PaginateHelper],
})
export class SharedModule {}
