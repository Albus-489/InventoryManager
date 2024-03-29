import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.schema';
import { Storage, StorageDocument } from 'src/storage/entities/storage.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Storage.name) private storageModel: Model<StorageDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(storageId: string, createProductDto: CreateProductDto) {
    const storage = await this.storageModel.findById(storageId);
    const newProduct = new this.productModel({
      ...createProductDto,
      storage: storage,
    });

    return await this.productModel.create(newProduct).then((newProduct) => {
      return this.storageModel.findByIdAndUpdate(
        storageId,
        { $push: { products: newProduct._id } },
        { new: true, useFindAndModify: false },
      );
    });
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    return await this.productModel.findById(id).populate("storage").exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
        useFindAndModify: false,
      })
      .then((updatedProdcut) => {
        console.log('Updated product:', updatedProdcut);
        return updatedProdcut;
      });
  }

  async remove(id: string) {
    // Отримання інформації про продукт
    const product = await this.productModel.findById(id);

    // Перевірка, чи існує продукт
    if (!product) {
      throw new Error('Продукт не знайдено');
    }

    // Отримання ідентифікатора складу, до якого належить продукт
    const storageId = product.storage;

    // Видалення продукту
    await this.productModel.findByIdAndDelete(id);

    // Оновлення масиву продуктів у відповідному об'єкті Storage
    await this.storageModel.updateOne(
      { _id: storageId },
      { $pull: { products: id } },
    );

    return { message: 'Product successfully deleted' };
  }
}
