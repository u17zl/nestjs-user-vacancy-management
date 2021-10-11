import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

@Injectable()
export class HttpServiceInterceptor implements NestInterceptor {
  constructor(private httpService: HttpService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (ctx.token) {
      this.httpService.axiosRef.defaults.headers.common['authorization'] =
        ctx.token;
    }
    return next.handle().pipe();
  }
}
