import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsInt()
  bookId!: number;

  @IsString()
  @IsNotEmpty()
  borrower!: string;
}
