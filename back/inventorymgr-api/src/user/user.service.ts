import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
  
    const user = new this.userModel(createUserDto);
  
    return user.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOneEmail(email: string) {
    return this.userModel.findOne({email: email}).exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).populate('storages').exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userModel.findByIdAndDelete(id);

    return { deletedUser: user }
  }
}
