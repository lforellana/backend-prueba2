import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Plazas, PlazasRelations, Personal, Requisitos} from '../models';
import {PersonalRepository} from './personal.repository';
import {RequisitosRepository} from './requisitos.repository';

export class PlazasRepository extends DefaultCrudRepository<
  Plazas,
  typeof Plazas.prototype.id,
  PlazasRelations
> {

  public readonly personals: HasManyRepositoryFactory<Personal, typeof Plazas.prototype.id>;

  public readonly requisitos: HasManyRepositoryFactory<Requisitos, typeof Plazas.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('PersonalRepository') protected personalRepositoryGetter: Getter<PersonalRepository>, @repository.getter('RequisitosRepository') protected requisitosRepositoryGetter: Getter<RequisitosRepository>,
  ) {
    super(Plazas, dataSource);
    this.requisitos = this.createHasManyRepositoryFactoryFor('requisitos', requisitosRepositoryGetter,);
    this.registerInclusionResolver('requisitos', this.requisitos.inclusionResolver);
    this.personals = this.createHasManyRepositoryFactoryFor('personals', personalRepositoryGetter,);
    this.registerInclusionResolver('personals', this.personals.inclusionResolver);
  }
}
