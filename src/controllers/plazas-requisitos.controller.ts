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
  Requisitos,
} from '../models';
import {PlazasRepository} from '../repositories';

export class PlazasRequisitosController {
  constructor(
    @repository(PlazasRepository) protected plazasRepository: PlazasRepository,
  ) { }

  @get('/plazas/{id}/requisitos', {
    responses: {
      '200': {
        description: 'Array of Plazas has many Requisitos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Requisitos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Requisitos>,
  ): Promise<Requisitos[]> {
    return this.plazasRepository.requisitos(id).find(filter);
  }

  @post('/plazas/{id}/requisitos', {
    responses: {
      '200': {
        description: 'Plazas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Requisitos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plazas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Requisitos, {
            title: 'NewRequisitosInPlazas',
            exclude: ['id'],
            optional: ['plazasId']
          }),
        },
      },
    }) requisitos: Omit<Requisitos, 'id'>,
  ): Promise<Requisitos> {
    return this.plazasRepository.requisitos(id).create(requisitos);
  }

  @patch('/plazas/{id}/requisitos', {
    responses: {
      '200': {
        description: 'Plazas.Requisitos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Requisitos, {partial: true}),
        },
      },
    })
    requisitos: Partial<Requisitos>,
    @param.query.object('where', getWhereSchemaFor(Requisitos)) where?: Where<Requisitos>,
  ): Promise<Count> {
    return this.plazasRepository.requisitos(id).patch(requisitos, where);
  }

  @del('/plazas/{id}/requisitos', {
    responses: {
      '200': {
        description: 'Plazas.Requisitos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Requisitos)) where?: Where<Requisitos>,
  ): Promise<Count> {
    return this.plazasRepository.requisitos(id).delete(where);
  }
}
