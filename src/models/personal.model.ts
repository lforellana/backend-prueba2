import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Personal>) {
    super(data);
  }
}

export interface PersonalRelations {
  // describe navigational properties here
}

export type PersonalWithRelations = Personal & PersonalRelations;
