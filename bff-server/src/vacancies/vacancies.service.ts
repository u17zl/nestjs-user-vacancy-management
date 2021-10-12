import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Types } from 'mongoose';
import { map, lastValueFrom } from 'rxjs';

import { CreateVacancyInput } from './dto/create-vacancy.input';
import { UpdateVacancyInput } from './dto/update-vacancy.input';

@Injectable()
export class VacanciesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(createVacancyInput: CreateVacancyInput): Promise<any> {
    const vacancy$ = this.httpService.post(
      `${this.configService.get('vacancy_service_base_url')}/vacancies`,
      createVacancyInput,
    );
    const { data } = await lastValueFrom(vacancy$);
    return data;
  }

  async findAll(): Promise<any> {
    return this.httpService
      .get(
        `${this.configService.get('vacancy_service_base_url')}/vacancies`,
      )
      .pipe(map((response) => response.data));
  }

  async findOne(id: Types.ObjectId): Promise<any> {
    return this.httpService
      .get(
        `${this.configService.get(
          'vacancy_service_base_url',
        )}/vacancies/${id}`,
      )
      .pipe(map((response) => response.data));
  }

  async update(
    id: Types.ObjectId,
    updateVacancyInput: UpdateVacancyInput,
  ): Promise<any> {
    return this.httpService
      .put(
        `${this.configService.get(
          'vacancy_service_base_url',
        )}/vacancies/${id}`,
        updateVacancyInput,
      )
      .pipe(map((response) => response.data));
  }

  async remove(id: Types.ObjectId): Promise<any> {
    return this.httpService
      .delete(
        `${this.configService.get(
          'vacancy_service_base_url',
        )}/vacancies/${id}`,
      )
      .pipe(map((response) => response.data));
  }

  async findByCompanyId(companyId: Types.ObjectId): Promise<any> {
    return this.httpService
      .get(
        `${this.configService.get(
          'vacancy_service_base_url',
        )}/vacancies?companyId=${companyId}`,
      )
      .pipe(map((response) => response.data));
  }
}
