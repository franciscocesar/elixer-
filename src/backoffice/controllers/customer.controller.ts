import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator-interceptor';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contracts';
import { CreatePetContract } from '../contracts/customer/create-pet.contract';
import { CreateCustomerDTO } from '../dtos/create-customer-dto';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {

  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService
  ) { }


  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async addCustomer(@Body() model: CreateCustomerDTO) {
    try {
      const user = await this.accountService.create(
        new User(model.document, model.password, true),
      );
      const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user)
      const res = await this.customerService.create(customer)

      return new Result('Cliente criado com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST)
    }

  }

  @Post(':document/addresses/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document, @Body() model: Address) {
    try {
      await this.customerService.addBillingAddress(document, model)
      return model;
    } catch (error) {
      throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }

  @Post(':document/addresses/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(@Param('document') document, @Body() model: Address) {
    try {
      await this.customerService.addShippingAddress(document, model)
      return model;
    } catch (error) {
      throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }

  @Post(':document/pets')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document, @Body() model: Pet) {
    try {
      await this.customerService.createPet(document, model)
      return model;
    } catch (error) {
      throw new HttpException(new Result('Não foi possível criar seu pet', false, null, error), HttpStatus.BAD_REQUEST)
    }
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
