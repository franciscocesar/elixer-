import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';

@Controller('v1/customers')
export class CustomerController {
  @Get()
  get(): string {
    return 'Obter os clientes';
  }
  @Get(':document')
  getById(@Param('document') document): string {
    return 'Obter os clientes' + document;
  }
  @Post()
  post(@Body() body: Customer) {
    return body;
  }
  @Put(':document')
  put(@Param('document') document, @Body() body) {
    const resultRequest = new Result(
      'Cliente Alterado com sucesso',
      true,
      body,
      null,
    );

    return resultRequest;
  }
}
