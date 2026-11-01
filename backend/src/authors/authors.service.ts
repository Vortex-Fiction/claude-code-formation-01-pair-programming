import { Inject, Injectable } from '@nestjs/common';
import type { Author } from '@formation/shared';
import type { Database } from '../db/database.js';
import { DATABASE } from '../db/database.module.js';
import { authors } from '../db/schema.js';
import { CreateAuthorDto } from './create-author.dto.js';

@Injectable()
export class AuthorsService {
  constructor(@Inject(DATABASE) private readonly database: Database) {}

  list(): Promise<Author[]> {
    return this.database.select().from(authors);
  }

  async create(input: CreateAuthorDto): Promise<Author> {
    const [author] = await this.database.insert(authors).values({ name: input.name }).returning();
    return author;
  }
}
