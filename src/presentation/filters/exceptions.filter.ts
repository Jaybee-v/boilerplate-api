import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseExceptions } from 'src/presentation/exceptions/base-exceptions';

@Catch(BaseExceptions)
export class FiltersExceptions implements ExceptionFilter {
  catch(exception: BaseExceptions, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(exception.status).json({
      statusCode: exception.status,
      message: exception.message,
      data: null,
    });
  }
}
