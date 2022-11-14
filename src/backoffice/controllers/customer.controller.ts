import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator-interceptor';
import { CreateCustomerContract } from '../contracts/customer.contracts';
import { CreateCustomerDTO } from '../dtos/create-customer-dto';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly accountServicer: AccountService) {}
  @Get()
  get(): string {
    return 'Obter os clientes';
  }
  @Get(':document')
  getById(@Param('document') document): string {
    return 'Obter os clientes' + document;
  }
  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDTO) {
    const user = await this.accountServicer.create(
      new User(model.document, model.password, true),
    );
    return new Result('Cliente criado com sucesso!', true, user, null);
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
