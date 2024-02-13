import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.schema';
import { Storage, StorageSchema } from 'src/storage/entities/storage.schema';
import { Product, ProductSchema } from 'src/product/entities/product.schema';
import { StorageModule } from 'src/storage/storage.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    StorageModule,
    ProductModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Storage.name, schema: StorageSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
