import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { Vacancy, VacancySchema } from './schemas/vacancy.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vacancy.name, schema: VacancySchema }]),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'AUTH_CLIENT',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('auth_check_service.host'),
            port: configService.get('auth_check_service.port'),
          },
        }),
      },
    ]),
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule {}
