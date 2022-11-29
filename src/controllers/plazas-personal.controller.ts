import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Plazas,
  Personal,
} from '../models';
import {PlazasRepository} from '../repositories';

export class PlazasPersonalController {
  constructor(
    @repository(PlazasRepository) protected plazasRepository: PlazasRepository,
  ) { }

  @get('/plazas/{id}/personals', {
    responses: {
      '200': {
        description: 'Array of Plazas has many Personal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Personal)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Personal>,
  ): Promise<Personal[]> {
    return this.plazasRepository.personals(id).find(filter);
  }

  @post('/plazas/{id}/personals', {
    responses: {
      '200': {
        description: 'Plazas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Personal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plazas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personal, {
            title: 'NewPersonalInPlazas',
            exclude: ['id'],
            optional: ['plazasId']
          }),
        },
      },
    }) personal: Omit<Personal, 'id'>,
  ): Promise<Personal> {
    return this.plazasRepository.personals(id).create(personal);
  }

  @patch('/plazas/{id}/personals', {
    responses: {
      '200': {
        description: 'Plazas.Personal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personal, {partial: true}),
        },
      },
    })
    personal: Partial<Personal>,
    @param.query.object('where', getWhereSchemaFor(Personal)) where?: Where<Personal>,
  ): Promise<Count> {
    return this.plazasRepository.personals(id).patch(personal, where);
  }

  @del('/plazas/{id}/personals', {
    responses: {
      '200': {
        description: 'Plazas.Personal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Personal)) where?: Where<Personal>,
  ): Promise<Count> {
    return this.plazasRepository.personals(id).delete(where);
  }
}
