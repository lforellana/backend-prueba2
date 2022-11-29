import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Requisitos,
  Plazas,
} from '../models';
import {RequisitosRepository} from '../repositories';

export class RequisitosPlazasController {
  constructor(
    @repository(RequisitosRepository)
    public requisitosRepository: RequisitosRepository,
  ) { }

  @get('/requisitos/{id}/plazas', {
    responses: {
      '200': {
        description: 'Plazas belonging to Requisitos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plazas)},
          },
        },
      },
    },
  })
  async getPlazas(
    @param.path.string('id') id: typeof Requisitos.prototype.id,
  ): Promise<Plazas> {
    return this.requisitosRepository.plazas(id);
  }
}
