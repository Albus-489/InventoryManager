import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.schema';
import * as bcrypt from 'bcrypt';
import { Storage, StorageDocument } from 'src/storage/entities/storage.schema';
import { Product, ProductDocument } from 'src/product/entities/product.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Storage.name) private storageModel: Model<StorageDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);

    return user.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOneEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).populate('storages').exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);

    const storages = await this.storageModel.find({ owner: user }).exec();
    const deletedStorages = [];
    for (const storage of storages) {
      // deletign all prducts
      await this.productModel
        .deleteMany({ _id: { $in: storage.products } })
        .exec();

      // storage remove
      await this.storageModel.findByIdAndDelete(storage._id).exec();

      // saving storage for return
      deletedStorages.push(storage);
    }

    // user remove
    await this.userModel.findByIdAndDelete(id).exec();

    return { deletedUser: user, deletedStorages };
  }
}
