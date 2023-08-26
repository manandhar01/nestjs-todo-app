import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginCredentials: CreateUserDto): Promise<User> {
    const user = await this.usersService.findOne(loginCredentials.username);

    if (await bcrypt.compare(loginCredentials.password, user.password)) {
      return user;
    }

    return null;
  }

  async login(loginCredentials: CreateUserDto) {
    const user = await this.validateUser(loginCredentials);

    const payload = { username: user.username, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
