import { Address } from './address.model';
import { CreditCard } from './credit-card.model';
import { Pet } from './pet.model';
import { User } from './user.model';

export class Customer {
  constructor(
    public name: string,
    public document: string,
    public email: string,
    public billingAddress: Address,
    public shippingAddress: Address,
    public creditCard: CreditCard,
    public pets: Pet[],
    public user: User,
  ) {}
}
