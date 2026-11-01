import { Module } from '@nestjs/common';
import { AuthorsController } from './authors/authors.controller.js';
import { AuthorsService } from './authors/authors.service.js';
import { BooksController } from './books/books.controller.js';
import { BooksService } from './books/books.service.js';
import { DatabaseModule } from './db/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorsController, BooksController],
  providers: [AuthorsService, BooksService],
})
export class AppModule {}
