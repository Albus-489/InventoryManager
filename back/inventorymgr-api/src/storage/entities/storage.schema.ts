import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ProductEtt } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.schema';
export type StorageDocument = Storage & Document;

@Schema()
export class Storage {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    required: false,
  })
  products: ProductEtt[];

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // })
  // owner: User;
}

export const StorageSchema = SchemaFactory.createForClass(Storage);
