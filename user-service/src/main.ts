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
      host: configService.get('auth_check_service.host'),
      port: configService.get('auth_check_service.port'),
    },
  });

  await app.startAllMicroservices();

  await app.listen(configService.get('port'));
  console.log(`User service application is running on: ${await app.getUrl()}`);
  console.log(
    `Auth microservice is running on: ${configService.get('auth_check_service.host',)}:${configService.get('auth_check_service.port')}`,
  );
}
bootstrap();
