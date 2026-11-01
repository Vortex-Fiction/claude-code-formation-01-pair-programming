import { Module } from '@nestjs/common';
import { AuthorsController } from './authors/authors.controller.js';
import { AuthorsService } from './authors/authors.service.js';
import { BooksController } from './books/books.controller.js';
import { BooksService } from './books/books.service.js';
import { DatabaseModule } from './db/database.module.js';
import { LoansController } from './loans/loans.controller.js';
import { LoansService } from './loans/loans.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorsController, BooksController, LoansController],
  providers: [AuthorsService, BooksService, LoansService],
})
export class AppModule {}
