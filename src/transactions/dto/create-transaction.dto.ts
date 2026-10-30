import {
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsOptional()
  @IsString()
  receiptNumber?: string;

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
