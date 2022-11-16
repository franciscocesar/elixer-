import { Injectable } from '@nestjs/common';
import { Address } from 'src/backoffice/models/address.model';
import { Flunt } from 'src/utils/flunt';
import { CreateCustomerDTO } from '../../dtos/create-customer-dto';
import { Contract } from '../contract';

@Injectable()
export class CreateAddressContract implements Contract {
  errors: any[];
  validate(model: Address): boolean {
    const flunt = new Flunt();
    flunt.isFixedLen(model.zipCode, 8, 'CEP Inválido');
    flunt.isFixedLen(model.state, 2, 'Estado inválido');
    flunt.isFixedLen(model.country, 3, 'País inválido');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
