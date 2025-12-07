import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // determine status code
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // determine error message and details
    let message: string = '';
    let errorDetails: Record<string, unknown> = {};

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message =
          (responseObj.message as string) || JSON.stringify(exceptionResponse);
        errorDetails = responseObj;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errorDetails.error = exception.name;
      errorDetails.stack =
        process.env.NODE_ENV === 'development' ? exception.stack : undefined;
    } else {
      message = 'Internal server error';
    }

    // log the exception details
    this.logger.error(
      `[${request.method}] ${request.url} - Status: ${status}`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );

    // send detailed response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
      ...(Object.keys(errorDetails).length > 0 && { error: errorDetails }),
    });
  }
}
