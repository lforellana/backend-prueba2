import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plazas} from './plazas.model';

@model()
export class Personal extends Entity {
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
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @property({
    type: 'string',
    required: true,
  })
  profesion: string;

  @belongsTo(() => Plazas)
  plazasId: string;

  constructor(data?: Partial<Personal>) {
    super(data);
  }
}

export interface PersonalRelations {
  // describe navigational properties here
}

export type PersonalWithRelations = Personal & PersonalRelations;
