import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Types } from 'mongoose';
import { map, lastValueFrom } from 'rxjs';

import { CreateCompanyInput } from './dto/create-company.input';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(createCompanyInput: CreateCompanyInput): Promise<any> {
    const company$ = this.httpService.post(
      `${this.configService.get('company_microservice_base_url')}/companies`,
      createCompanyInput,
    );
    const { data } = await lastValueFrom(company$);
    return data;
  }

  async findAll(): Promise<any> {
    console.log(
      `${this.configService.get('company_microservice_base_url')}/companies`,
    );
    return this.httpService
      .get(
        `${this.configService.get('company_microservice_base_url')}/companies`,
      )
      .pipe(map((response) => response.data));
  }

  async findOne(id: Types.ObjectId): Promise<any> {
    return this.httpService
      .get(
        `${this.configService.get(
          'company_microservice_base_url',
        )}/companies/${id}`,
      )
      .pipe(map((response) => response.data));
  }
}
