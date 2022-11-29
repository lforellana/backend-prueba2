import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Plazas} from '../models';
import {PlazasRepository} from '../repositories';

export class PlazasController {
  constructor(
    @repository(PlazasRepository)
    public plazasRepository : PlazasRepository,
  ) {}

  @post('/plazas')
  @response(200, {
    description: 'Plazas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Plazas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plazas, {
            title: 'NewPlazas',
            exclude: ['id'],
          }),
        },
      },
    })
    plazas: Omit<Plazas, 'id'>,
  ): Promise<Plazas> {
    return this.plazasRepository.create(plazas);
  }

  @get('/plazas/count')
  @response(200, {
    description: 'Plazas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Plazas) where?: Where<Plazas>,
  ): Promise<Count> {
    return this.plazasRepository.count(where);
  }

  @get('/plazas')
  @response(200, {
    description: 'Array of Plazas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Plazas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Plazas) filter?: Filter<Plazas>,
  ): Promise<Plazas[]> {
    return this.plazasRepository.find(filter);
  }

  @patch('/plazas')
  @response(200, {
    description: 'Plazas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plazas, {partial: true}),
        },
      },
    })
    plazas: Plazas,
    @param.where(Plazas) where?: Where<Plazas>,
  ): Promise<Count> {
    return this.plazasRepository.updateAll(plazas, where);
  }

  @get('/plazas/{id}')
  @response(200, {
    description: 'Plazas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Plazas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Plazas, {exclude: 'where'}) filter?: FilterExcludingWhere<Plazas>
  ): Promise<Plazas> {
    return this.plazasRepository.findById(id, filter);
  }

  @patch('/plazas/{id}')
  @response(204, {
    description: 'Plazas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plazas, {partial: true}),
        },
      },
    })
    plazas: Plazas,
  ): Promise<void> {
    await this.plazasRepository.updateById(id, plazas);
  }

  @put('/plazas/{id}')
  @response(204, {
    description: 'Plazas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() plazas: Plazas,
  ): Promise<void> {
    await this.plazasRepository.replaceById(id, plazas);
  }

  @del('/plazas/{id}')
  @response(204, {
    description: 'Plazas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.plazasRepository.deleteById(id);
  }
}
