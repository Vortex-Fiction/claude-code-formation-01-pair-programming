import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import type { Loan } from '@formation/shared';
import { CreateLoanDto } from './create-loan.dto.js';
import { LoansService } from './loans.service.js';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  list(): Promise<Loan[]> {
    return this.loansService.list();
  }

  @Post()
  borrow(@Body() input: CreateLoanDto): Promise<Loan> {
    return this.loansService.borrow(input);
  }

  @Post(':id/return')
  returnLoan(@Param('id', ParseIntPipe) id: number): Promise<Loan> {
    return this.loansService.returnLoan(id);
  }
}
