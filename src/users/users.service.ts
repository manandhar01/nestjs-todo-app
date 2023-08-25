import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   const user = await this.usersRepository.findOneBy({ id });
  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   return await this.usersRepository.save({ ...user, ...updateUserDto });
  // }

  // async remove(id: number): Promise<User> {
  //   const user = await this.usersRepository.findOneBy({ id });
  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   return this.usersRepository.remove(user);
  // }
}
