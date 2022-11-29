import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Requisitos, RequisitosRelations} from '../models';

export class RequisitosRepository extends DefaultCrudRepository<
  Requisitos,
  typeof Requisitos.prototype.id,
  RequisitosRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Requisitos, dataSource);
  }
}
