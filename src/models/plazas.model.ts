import {Entity, model, property, hasMany} from '@loopback/repository';
import {Personal} from './personal.model';
import {Requisitos} from './requisitos.model';

@model()
export class Plazas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombrePuesto: string;

  @property({
    type: 'string',
    required: true,
  })
  area: string;

  @property({
    type: 'boolean',
    required: true,
  })
  salarioSugerido: boolean;

  @hasMany(() => Personal)
  personals: Personal[];

  @hasMany(() => Requisitos)
  requisitos: Requisitos[];

  constructor(data?: Partial<Plazas>) {
    super(data);
  }
}

export interface PlazasRelations {
  // describe navigational properties here
}

export type PlazasWithRelations = Plazas & PlazasRelations;
