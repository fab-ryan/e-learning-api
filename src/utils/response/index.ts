import { Injectable, Scope, Inject, HttpStatus, ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ResponseDto } from './response.dto';
import { REQUEST } from '@nestjs/core';
import { Request, Response } from 'express';
import { PartialType } from '@nestjs/swagger';

export class IResponseData<T> {
  success = true;
  statusCode: number = HttpStatus.OK;
  data: T = null;
  path: any;
  method: string;
  requestId?: string;
  timestamp: number = Date.now();
  message: string;
  key?: string = 'data';
}

export class IRequest extends PartialType(IResponseData) { }

@Injectable({ scope: Scope.REQUEST | Scope.TRANSIENT | Scope.DEFAULT })
export class ResponseService {
  constructor(@Inject(REQUEST) private readonly request: Request) { }
  public Response(result: IRequest): ResponseDto {
    const { route, method } = this.request;
    const response: ResponseDto = {
      success: result.success,
      statusCode: result.statusCode,
      [result.key ?? 'data']: result.data,
      path: route.path,
      method: method,
      requestId: result.requestId,
      message: result.message,
      timestamp: new Date(Date.now()).toISOString(),
    };
    return response;
  }

}


@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly responseService: ResponseService) { }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const result = {
      success: false,
      statusCode: status,
      data: null,
      key: 'error',
      message:
        exception.message || 'An unexpected error occurred',
    };
    const errorResponse = this.responseService.Response(result);
    response.status(status).json(errorResponse);
  }

}
