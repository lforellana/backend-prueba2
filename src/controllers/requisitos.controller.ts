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
import {Requisitos} from '../models';
import {RequisitosRepository} from '../repositories';

export class RequisitosController {
  constructor(
    @repository(RequisitosRepository)
    public requisitosRepository : RequisitosRepository,
  ) {}

  @post('/requisitos')
  @response(200, {
    description: 'Requisitos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Requisitos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Requisitos, {
            title: 'NewRequisitos',
            exclude: ['id'],
          }),
        },
      },
    })
    requisitos: Omit<Requisitos, 'id'>,
  ): Promise<Requisitos> {
    return this.requisitosRepository.create(requisitos);
  }

  @get('/requisitos/count')
  @response(200, {
    description: 'Requisitos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Requisitos) where?: Where<Requisitos>,
  ): Promise<Count> {
    return this.requisitosRepository.count(where);
  }

  @get('/requisitos')
  @response(200, {
    description: 'Array of Requisitos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Requisitos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Requisitos) filter?: Filter<Requisitos>,
  ): Promise<Requisitos[]> {
    return this.requisitosRepository.find(filter);
  }

  @patch('/requisitos')
  @response(200, {
    description: 'Requisitos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Requisitos, {partial: true}),
        },
      },
    })
    requisitos: Requisitos,
    @param.where(Requisitos) where?: Where<Requisitos>,
  ): Promise<Count> {
    return this.requisitosRepository.updateAll(requisitos, where);
  }

  @get('/requisitos/{id}')
  @response(200, {
    description: 'Requisitos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Requisitos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Requisitos, {exclude: 'where'}) filter?: FilterExcludingWhere<Requisitos>
  ): Promise<Requisitos> {
    return this.requisitosRepository.findById(id, filter);
  }

  @patch('/requisitos/{id}')
  @response(204, {
    description: 'Requisitos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Requisitos, {partial: true}),
        },
      },
    })
    requisitos: Requisitos,
  ): Promise<void> {
    await this.requisitosRepository.updateById(id, requisitos);
  }

  @put('/requisitos/{id}')
  @response(204, {
    description: 'Requisitos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() requisitos: Requisitos,
  ): Promise<void> {
    await this.requisitosRepository.replaceById(id, requisitos);
  }

  @del('/requisitos/{id}')
  @response(204, {
    description: 'Requisitos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.requisitosRepository.deleteById(id);
  }
}
