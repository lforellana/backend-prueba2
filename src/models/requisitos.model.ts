import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plazas} from './plazas.model';

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

  @belongsTo(() => Plazas)
  plazasId: string;

  constructor(data?: Partial<Requisitos>) {
    super(data);
  }
}

export interface RequisitosRelations {
  // describe navigational properties here
}

export type RequisitosWithRelations = Requisitos & RequisitosRelations;
