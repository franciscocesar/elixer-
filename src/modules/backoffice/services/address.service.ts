import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryDto } from '../dtos/customer/quert-dtos';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';

@Injectable()
export class AddressService {
  constructor(@InjectModel('Customer') private readonly model: Model<User>) {}

  async addBillingAddress(document: string, data: Address): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          billingAddress: data,
        },
      },
      options,
    );
  }

  async addShippingAddress(document: string, data: Address): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          shippingAddress: data,
        },
      },
      options,
    );
  }
}
