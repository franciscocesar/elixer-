import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class CustomerService {
  constructor(@InjectModel('Customer') private readonly model: Model<User>) {}

  async create(data: User): Promise<User> {
    const customer = new this.model(data);
    return await customer.save();
  }
}
