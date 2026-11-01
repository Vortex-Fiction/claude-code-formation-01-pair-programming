import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Global, Module } from '@nestjs/common';
import { createDatabase } from './database.js';

export const DATABASE = 'DATABASE';

const DATABASE_FILE = path.join(import.meta.dirname, '..', '..', 'data', 'library.db');

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: () => createDatabase(pathToFileURL(DATABASE_FILE).href),
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
