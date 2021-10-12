import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company, CompanySchema } from './schemas/company.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
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
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
