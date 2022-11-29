import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Plazas, PlazasRelations} from '../models';

export class PlazasRepository extends DefaultCrudRepository<
  Plazas,
  typeof Plazas.prototype.id,
  PlazasRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Plazas, dataSource);
  }
}
