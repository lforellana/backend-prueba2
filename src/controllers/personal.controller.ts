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
import {Personal} from '../models';
import {PersonalRepository} from '../repositories';

export class PersonalController {
  constructor(
    @repository(PersonalRepository)
    public personalRepository : PersonalRepository,
  ) {}

  @post('/personals')
  @response(200, {
    description: 'Personal model instance',
    content: {'application/json': {schema: getModelSchemaRef(Personal)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personal, {
            title: 'NewPersonal',
            exclude: ['id'],
          }),
        },
      },
    })
    personal: Omit<Personal, 'id'>,
  ): Promise<Personal> {
    return this.personalRepository.create(personal);
  }

  @get('/personals/count')
  @response(200, {
    description: 'Personal model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Personal) where?: Where<Personal>,
  ): Promise<Count> {
    return this.personalRepository.count(where);
  }

  @get('/personals')
  @response(200, {
    description: 'Array of Personal model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Personal, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Personal) filter?: Filter<Personal>,
  ): Promise<Personal[]> {
    return this.personalRepository.find(filter);
  }

  @patch('/personals')
  @response(200, {
    description: 'Personal PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personal, {partial: true}),
        },
      },
    })
    personal: Personal,
    @param.where(Personal) where?: Where<Personal>,
  ): Promise<Count> {
    return this.personalRepository.updateAll(personal, where);
  }

  @get('/personals/{id}')
  @response(200, {
    description: 'Personal model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Personal, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Personal, {exclude: 'where'}) filter?: FilterExcludingWhere<Personal>
  ): Promise<Personal> {
    return this.personalRepository.findById(id, filter);
  }

  @patch('/personals/{id}')
  @response(204, {
    description: 'Personal PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personal, {partial: true}),
        },
      },
    })
    personal: Personal,
  ): Promise<void> {
    await this.personalRepository.updateById(id, personal);
  }

  @put('/personals/{id}')
  @response(204, {
    description: 'Personal PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() personal: Personal,
  ): Promise<void> {
    await this.personalRepository.replaceById(id, personal);
  }

  @del('/personals/{id}')
  @response(204, {
    description: 'Personal DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personalRepository.deleteById(id);
  }
}
