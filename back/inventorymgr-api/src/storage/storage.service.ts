import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Storage, StorageDocument } from './entities/storage.schema';
import { Product, ProductDocument } from 'src/product/entities/product.schema';
import { User, UserDocument } from 'src/user/entities/user.schema';

@Injectable()
export class StorageService {
  constructor(
    @InjectModel(Storage.name) private storageModel: Model<StorageDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(id: string, createStorageDto: CreateStorageDto) {
    const userObjId = new mongoose.Types.ObjectId(id)
    const user = await this.userModel.findById(userObjId).exec();

    if (!user) {
      throw new Error('User not found');
    }

    const newStorage = new this.storageModel({ ...createStorageDto, owner: user });

    const savedStorage = await newStorage.save();

    user.storages.push(savedStorage);
    await user.save();

    return savedStorage;
}

  findAll() {
    return this.storageModel.find().exec();
  }

  findOne(id: string) {
    return this.storageModel
      .findById(id)
      .populate("owner")
      .exec();
  }

  async findOneWithPagination(id: string, page: number, limit: number) {
    page = page || 1;
    limit = limit || 5;
    const skip = (page - 1) * limit;

    const storage = await this.storageModel.findById(id).exec();

    if (!storage) {
      throw new NotFoundException(`Storage with id ${id} not found.`);
    }

    const products = await this.productModel
      .find({ storage: id })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      ...storage.toObject(),
      products,
    };
  }

  update(id: string, updateStorageDto: CreateStorageDto) {
    return this.storageModel
      .findByIdAndUpdate(id, updateStorageDto, {
        new: true,
        useFindAndModify: false,
      })
      .then((updatedStorage) => {
        console.log('Updated storage:', updatedStorage);
        return updatedStorage;
      });
  }

  async remove(storageId: string) {
    // Отримання інформації про склад
    const storage = await this.storageModel.findById(storageId);
    const user = await this.userModel.findById(storage.owner);

    // Перевірка, чи існує склад
    if (!storage) {
      throw new Error('Storage not found');
    }

    // Видалення складу
    await this.storageModel.findByIdAndDelete(storageId);

    // Видалення продуктів, пов'язаних зі складом
    await this.productModel.deleteMany({ storage: storageId });

    return { deletedStorage: storage.name, deletedProducts: storage.products }; // Повернення назви видаленого складу з його товарами
  }
}
