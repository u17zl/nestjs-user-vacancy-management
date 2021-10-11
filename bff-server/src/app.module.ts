import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpServiceInterceptor } from './interceptors/http-service.interceptors';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env.development',
      load: [configuration],
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => {
        return { token: req.headers.authorization };
      },
    }),
    UsersModule,
    CompaniesModule,
    VacanciesModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpServiceInterceptor,
    },
  ],
})
export class AppModule {}
