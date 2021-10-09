import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';
import { lastValueFrom, TimeoutError, throwError } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const jwt = req.headers['authorization']?.split(' ')[1];

    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const user$ = this.client
        .send(
          { role: 'auth', cmd: 'check' },
          { jwt: req.headers['authorization']?.split(' ')[1] },
        )
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(() => new RequestTimeoutException());
            }
            return throwError(() => err);
          }),
        );
      // toPromise is deprecated
      const user = await lastValueFrom(user$);

      if (user) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
