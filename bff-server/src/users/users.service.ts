import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom, Observable } from 'rxjs';
import { Types } from 'mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<any> {
    const token$ = this.httpService.post(
      `${this.configService.get('user_service_base_url')}/auth/signup`,
      createUserInput,
    );
    const { data } = await lastValueFrom(token$);
    console.log(data)
    return data;
  }

  async login(loginInput: LoginInput): Promise<any> {
    const user$ = this.httpService.post(
      `${this.configService.get('user_service_base_url')}/auth/login`,
      loginInput,
    );
    const { data } = await lastValueFrom(user$);
    return data;
  }

  async findAll(): Promise<any> {
    return this.httpService
      .get(`${this.configService.get('user_service_base_url')}/users`)
      .pipe(map((response) => response.data));
  }

  async findOne(id: Types.ObjectId): Promise<any> {
    return this.httpService
      .get(
        `${this.configService.get('user_service_base_url')}/users/${id}`,
      )
      .pipe(map((response) => response.data));
  }

  async findByCompanyId(companyId: Types.ObjectId): Promise<any> {
    return this.httpService
      .get(
        `${this.configService.get(
          'user_service_base_url',
        )}/users?companyId=${companyId}`,
      )
      .pipe(map((response) => response.data));
  }
}
