// src/module/payment/payment.controller.ts

import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { PaymentServiceClient } from '../proto/payment_grpc_pb.js';
import { TransactionRequest } from '../proto/TransactionRequest';
import { TransactionResponse } from '../proto/TransactionResponse';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentServiceClient) {
    
  }

  @GrpcMethod('PaymentService', 'CreateTransaction')
  async createTransaction(request: TransactionRequest): Promise<TransactionResponse> {
    try {
      // Lógica para crear la transacción usando Transbank u otro servicio
      const buyOrder = 'ordenCompra123';
      const sessionId = 'sesion123';
      const amount = 1000;
      const returnUrl = 'https://www.google.com';

      const grpcRequest = new TransactionRequest();
      grpcRequest.setBuyOrder(buyOrder);
      grpcRequest.setSessionId(sessionId);
      grpcRequest.setAmount(amount);
      grpcRequest.setReturnUrl(returnUrl);

      const grpcResponse = await this.paymentService.createTransaction(grpcRequest).toPromise();

      // Puedes mapear los campos de la respuesta gRPC a tu propia respuesta si es necesario
      const response = new TransactionResponse();
      response.setUrl(grpcResponse.getUrl());
      response.setToken(grpcResponse.getToken());

      return response;
    } catch (error) {
      // Manejar errores, por ejemplo, lanzar una excepción personalizada
      throw new Error('Error al crear la transacción');
    }
  }

}

