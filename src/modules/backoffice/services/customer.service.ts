import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryDto } from '../dtos/customer/quert-dtos';
import { UpdateCustomerDTO } from '../dtos/customer/update-customer-dto';
import { Address } from '../models/address.model';
import { CreditCard } from '../models/credit-card.model';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';

@Injectable()
export class CustomerService {
  constructor(@InjectModel('Customer') private readonly model: Model<User>) {}

  async create(data: Customer): Promise<User> {
    const customer = new this.model(data);
    return await customer.save();
  }

  async update(document: string, data: UpdateCustomerDTO): Promise<User> {
    return await this.model.findOneAndUpdate({ document }, data);
  }

  async findAll(): Promise<Customer[]> {
    return await this.model.find({}, '-name');
  }

  async find(document): Promise<Customer | any> {
    const users = await this.model
      .find({ document })
      .populate('user', 'username');

    if (!!users) {
      return new Result('Usuário não encontrado', false, [], null);
    }
    return users;
  }

  async query(model: QueryDto): Promise<Customer[] | any> {
    return await this.model
      .find(model.query, model.fields, {
        skip: model.skip,
        limit: model.take,
      })
      .sort(model.sort)
      .exec();
  }

  async saveOrUpdateCreditCart(
    document: string,
    data: CreditCard,
  ): Promise<any> {
    const options = { upsert: true };

    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          card: data,
        },
      },
      options,
    );
  }
}
