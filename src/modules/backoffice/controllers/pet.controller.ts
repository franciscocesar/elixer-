import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator-interceptor';

import { CreatePetContract } from '../contracts/pet/create-pet.contract';

import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';

import { PetService } from '../services/pet.service';

@Controller('v1/customers')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document, @Body() model: Pet) {
    try {
      await this.petService.createPet(document, model);
      return model;
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível criar seu pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document,
    @Param('id') id,
    @Body() model: Pet,
  ) {
    try {
      await this.petService.updatePet(document, id, model);
      return model;
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível atualizar seu pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
