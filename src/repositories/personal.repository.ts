import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Personal, PersonalRelations, Plazas} from '../models';
import {PlazasRepository} from './plazas.repository';

export class PersonalRepository extends DefaultCrudRepository<
  Personal,
  typeof Personal.prototype.id,
  PersonalRelations
> {

  public readonly plazas: BelongsToAccessor<Plazas, typeof Personal.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('PlazasRepository') protected plazasRepositoryGetter: Getter<PlazasRepository>,
  ) {
    super(Personal, dataSource);
    this.plazas = this.createBelongsToAccessorFor('plazas', plazasRepositoryGetter,);
    this.registerInclusionResolver('plazas', this.plazas.inclusionResolver);
  }
}
