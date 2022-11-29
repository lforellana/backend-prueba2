import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Personal, PersonalRelations} from '../models';

export class PersonalRepository extends DefaultCrudRepository<
  Personal,
  typeof Personal.prototype.id,
  PersonalRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Personal, dataSource);
  }
}
