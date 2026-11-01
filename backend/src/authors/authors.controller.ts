import { Body, Controller, Get, Post } from '@nestjs/common';
import type { Author } from '@formation/shared';
import { AuthorsService } from './authors.service.js';
import { CreateAuthorDto } from './create-author.dto.js';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  list(): Promise<Author[]> {
    return this.authorsService.list();
  }

  @Post()
  create(@Body() input: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(input);
  }
}
