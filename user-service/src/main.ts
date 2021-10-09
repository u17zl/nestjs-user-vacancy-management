import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: configService.get('AUTH_MICROSERVICE_HOST'),
      port: configService.get('AUTH_MICROSERVICE_PORT')
    }
  })

  await app.startAllMicroservices();

  await app.listen(configService.get('PORT'));
  console.log(`User service application is running on: ${await app.getUrl()}`);
  console.log(`Auth check microservice is running on: ${configService.get('AUTH_MICROSERVICE_HOST')}:${configService.get('AUTH_MICROSERVICE_PORT')}`);
}
bootstrap();
