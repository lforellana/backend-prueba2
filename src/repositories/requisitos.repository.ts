import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Requisitos, RequisitosRelations, Plazas} from '../models';
import {PlazasRepository} from './plazas.repository';

export class RequisitosRepository extends DefaultCrudRepository<
  Requisitos,
  typeof Requisitos.prototype.id,
  RequisitosRelations
> {

  public readonly plazas: BelongsToAccessor<Plazas, typeof Requisitos.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('PlazasRepository') protected plazasRepositoryGetter: Getter<PlazasRepository>,
  ) {
    super(Requisitos, dataSource);
    this.plazas = this.createBelongsToAccessorFor('plazas', plazasRepositoryGetter,);
    this.registerInclusionResolver('plazas', this.plazas.inclusionResolver);
  }
}
