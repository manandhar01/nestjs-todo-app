import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });
    if (user) {
      throw new NotAcceptableException();
    }

    const newUser = this.usersRepository.create(createUserDto);
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt);
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

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      return null;
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
