import { DbModule } from '@/configs';
import { AuthenticateMiddleware } from '@/middlewares';
import { ResponseService } from '@/utils';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [DbModule],
  controllers: [],
  providers: [ResponseService, AuthenticateMiddleware],
  exports: [ResponseService, AuthenticateMiddleware],
})
export class SharedModule {}
