import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // host: , // needed
  // port: , // needed
  // username: , // needed
  // password: , // needed
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
