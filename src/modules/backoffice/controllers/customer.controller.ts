import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator-interceptor';
import { CreateCreditCartContract } from '../contracts/customer/create-credit-cart.contracts';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contracts';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contracts';
import { CreateCustomerDTO } from '../dtos/customer/create-customer-dto';
import { QueryDto } from '../dtos/customer/quert-dtos';
import { UpdateCustomerDTO } from '../dtos/customer/update-customer-dto';
import { CreditCard } from '../models/credit-card.model';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Get('clients')
  async findAll() {
    try {
      const allUsers = await this.customerService.findAll();

      return allUsers;
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível realizar seu cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/clients/:documente')
  async listeUser(@Param('documente') documente) {
    try {
      return await this.customerService.find(documente);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível buscar usuário', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async addCustomer(@Body() model: CreateCustomerDTO): Promise<Result> {
    try {
      const user = await this.accountService.create(
        new User(model.document, model.password, true),
      );
      const customer = new Customer(
        model.name,
        model.document,
        model.email,
        null,
        null,
        null,
        null,
        user,
      );
      const res = await this.customerService.create(customer);

      return new Result('Cliente criado com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível realizar seu cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('query')
  async query(@Body() model: QueryDto) {
    return this.customerService.query(model);
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async update(@Param('document') document, @Body() model: UpdateCustomerDTO) {
    try {
      await this.customerService.update(document, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível alterar o usuário', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Put(':document/credit-cards')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCartContract()))
  async createCreditCard(
    @Param('document') document,
    @Body() model: CreditCard,
  ) {
    try {
      await this.customerService.saveOrUpdateCreditCart(document, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi adicionar cartão de crédito', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
