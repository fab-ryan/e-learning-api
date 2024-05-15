import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  constructor(private readonly i18nService: I18nService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const lang = req.headers['x-lang'] as string;
    this.i18nService.resolveLanguage(lang);
    next();
  }
}
