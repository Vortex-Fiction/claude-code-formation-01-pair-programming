import { Body, Controller, Get, Post } from '@nestjs/common';
import type { Book, BookWithAuthor } from '@formation/shared';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './create-book.dto.js';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  list(): Promise<BookWithAuthor[]> {
    return this.booksService.list();
  }

  @Post()
  create(@Body() input: CreateBookDto): Promise<Book> {
    return this.booksService.create(input);
  }
}
