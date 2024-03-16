import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/product/entities/product.schema';
import { User, UserDocument } from 'src/user/entities/user.schema';
export type StorageDocument = Storage & Document;

@Schema()
export class Storage {
  @Prop()
  name: string;
  @Prop()
  description: string;

  @Prop()
  picture: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    required: false,
  })
  products: Product[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: () => new mongoose.Types.ObjectId("65cb3229ed3c176bcc80da67")
  })
  owner: User;
}

export const StorageSchema = SchemaFactory.createForClass(Storage);
