import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { INestMicroservice } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

  
async function bootstrap() {
  
  const app: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3003',
        package: 'payment',
        protoPath: join(
          __dirname,
          './src/proto/payment.proto',
        ),
      },
    });
  await app.listen();
}
bootstrap();
