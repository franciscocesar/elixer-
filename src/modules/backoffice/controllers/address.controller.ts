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
import { CreateAddressContract } from '../contracts/address/create-address.contract';
import { Address } from '../models/address.model';
import { Result } from '../models/result.model';
import { AddressService } from '../services/address.service';

@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document, @Body() model: Address) {
    try {
      await this.addressService.addBillingAddress(document, model);
      return model;
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível adicionar seu endereço',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document,
    @Body() model: Address,
  ) {
    try {
      await this.addressService.addShippingAddress(document, model);
      return model;
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível adicionar seu endereço',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
