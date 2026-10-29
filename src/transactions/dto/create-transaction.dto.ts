import { IsString, IsNumber, IsArray, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsString()
  customerName!: string;

  @IsArray()
  cart!: any[];

  @IsNumber()
  subtotal!: number;

  @IsEnum(['cash', 'transfer'])
  paymentMethod!: string;

  @Type(() => Date)
  @IsDate()
  saleDate!: Date;
}
