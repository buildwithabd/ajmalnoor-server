import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

class ItemSpec {
  sn?: string;
  ram?: string;
  rom?: string;
  touchscreen?: boolean;
}

class CartItem {
  id!: string;
  name!: string;
  type!: string;
  qty!: number;
  price!: number;
  specs?: ItemSpec;
}

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, unique: true })
  receiptNumber!: string;

  @Prop({ required: true })
  customerName!: string;

  @Prop({ type: Array, required: true })
  cart!: CartItem[];

  @Prop({ required: true })
  subtotal!: number;

  @Prop({ required: true, enum: ['cash', 'transfer'] })
  paymentMethod!: string;

  @Prop({ required: true })
  saleDate!: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
