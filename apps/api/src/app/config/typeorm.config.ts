import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.KK_HOSTNAME || dbConfig.host,
  port: process.env.KK_PORT || dbConfig.port,
  username: process.env.KK_USERNAME || dbConfig.username,
  password: process.env.KK_PASSWORD || dbConfig.password,
  database: process.env.KK_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.KK_TYPEORM_SYNC || dbConfig.synchronize,
  autoLoadEntities: true,
  logNotifications: true,
};
