
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TaskInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

    // let data = {
    //     ...createUserDto,
    //     password: hashPass
    //   }

    return next.handle().pipe(map(data => {
        console.log(data)
        const {
            user,
            ...detail

        } = data
        return detail
       }));
  }
}