// src/module/app.module.ts
import { Module } from '@nestjs/common';
import { PaymentController } from '../controller/app.controller'; // Ajusta la ruta según tu estructura de carpetas

@Module({
  controllers: [PaymentController], // Si tienes un controlador específico para la lógica de pago, agrégalo aquí
})
export class AppModule {}
