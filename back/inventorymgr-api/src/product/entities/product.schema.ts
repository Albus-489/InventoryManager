import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Storage } from 'src/storage/entities/storage.schema';
export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop({
    default: () =>
      'https://www.kangarooselfstorage.co.uk/wp-content/uploads/2018/12/Business-Storage-Archive-Storage-1.jpg',
  })
  photo: string;

  @Prop({default: ''})
  group: string;

  @Prop({default: 0})
  qtt: number;

  @Prop({default: 0})
  minimum: number;

  @Prop({default: false})
  available: boolean;

  @Prop({default: () => new Date()})
  lastPurchase: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Storage',
    required: false,
  })
  storage: Storage;

  constructor(product: Product){
    Object.assign(this, product)
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
