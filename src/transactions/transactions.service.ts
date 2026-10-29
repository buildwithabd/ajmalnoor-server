import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const receiptNumber = await this.generateReceiptNumber(dto.saleDate);

    const transaction = new this.transactionModel({
      ...dto,
      receiptNumber,
    });

    return transaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Transaction | null> {
    return this.transactionModel.findById(id).exec();
  }

  async findByReceiptNumber(
    receiptNumber: string,
  ): Promise<Transaction | null> {
    return this.transactionModel.findOne({ receiptNumber }).exec();
  }

  private async generateReceiptNumber(saleDate: Date): Promise<string> {
    const date = new Date(saleDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const prefix = `AJN-${month}${day}`;

    // count transactions with same date prefix
    const count = await this.transactionModel
      .countDocuments({
        receiptNumber: { $regex: `^${prefix}` },
      })
      .exec();

    const suffix = String(count + 1).padStart(3, '0');
    return `${prefix}-${suffix}`;
  }
}
