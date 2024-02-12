import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProductModule,
    StorageModule,
    UserModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/inventorymgr',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}