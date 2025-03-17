import { DbModule } from '@/configs';
import { AuthenticateMiddleware } from '@/middlewares';
import { ResponseService } from '@/utils';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';

@Global()
@Module({
  imports: [DbModule,
    SentryModule.forRoot()
  ],
  controllers: [],
  providers: [ResponseService, AuthenticateMiddleware,
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter
    }
  ],
  exports: [ResponseService, AuthenticateMiddleware],
})
export class SharedModule { }
