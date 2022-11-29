import {Entity, model, property} from '@loopback/repository';

@model()
export class Requisitos extends Entity {
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
  nivelEducativo: string;

  @property({
    type: 'string',
    required: true,
  })
  experianciaLaboral: string;


  constructor(data?: Partial<Requisitos>) {
    super(data);
  }
}

export interface RequisitosRelations {
  // describe navigational properties here
}

export type RequisitosWithRelations = Requisitos & RequisitosRelations;
