import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { Storage, StorageSchema } from './entities/storage.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/product/entities/product.schema';
import { User, UserSchema } from 'src/user/entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Storage.name, schema: StorageSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
