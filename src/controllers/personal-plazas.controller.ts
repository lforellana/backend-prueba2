import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Personal,
  Plazas,
} from '../models';
import {PersonalRepository} from '../repositories';

export class PersonalPlazasController {
  constructor(
    @repository(PersonalRepository)
    public personalRepository: PersonalRepository,
  ) { }

  @get('/personals/{id}/plazas', {
    responses: {
      '200': {
        description: 'Plazas belonging to Personal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plazas)},
          },
        },
      },
    },
  })
  async getPlazas(
    @param.path.string('id') id: typeof Personal.prototype.id,
  ): Promise<Plazas> {
    return this.personalRepository.plazas(id);
  }
}
