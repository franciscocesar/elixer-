import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';
import { User } from '../models/user.model';

@Injectable()
export class PetService {
  constructor(@InjectModel('Customer') private readonly model: Model<User>) {}

  async createPet(document: string, data: Pet): Promise<Customer> {
    const options = { upsert: true, new: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $push: {
          shippingAddress: data,
        },
      },
      options,
    );
  }

  async updatePet(document: string, id: string, data: Pet): Promise<Customer> {
    return await this.model.findOneAndUpdate(
      { document, 'pets._id': id },
      {
        $set: {
          'pets.$': data,
        },
      },
    );
  }
}
