import { beforeEach, describe, expect, it } from 'vitest';
import { createDatabase } from '../db/database.js';
import { AuthorsService } from './authors.service.js';

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(async () => {
    service = new AuthorsService(await createDatabase(':memory:'));
  });

  it('lists the seeded authors', async () => {
    expect(await service.list()).toHaveLength(3);
  });

  it('creates an author', async () => {
    const author = await service.create({ name: 'Charlotte Brontë' });
    expect(author.name).toBe('Charlotte Brontë');
    expect(await service.list()).toHaveLength(4);
  });
});
