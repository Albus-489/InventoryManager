import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Storage } from 'src/storage/entities/storage.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Storage' }],
    required: false,
  })
  storages: Storage[]

  constructor(user: User){
    Object.assign(this, user);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
