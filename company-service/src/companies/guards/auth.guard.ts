import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const user = await this.client
        .send(
          { role: 'auth', cmd: 'check' },
          { jwt: req.headers['authorization']?.split(' ')[1] },
        )
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(err);
          }),
        )
        .toPromise();

      return user && true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
