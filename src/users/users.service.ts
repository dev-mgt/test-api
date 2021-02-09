import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as users from './data/users.json'

@Injectable()
export class UsersService {
  users: User[]

  constructor() {
    this.users = users
  }

  create(createUserDto: CreateUserDto) {
    const lastUser = this.users[this.users.length - 1]
    let lastId = lastUser?.id || 1
    lastId++

    createUserDto.id = lastId

    this.users = this.users.concat(createUserDto)
    return createUserDto;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(p => p.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id)

    Object.assign(user, updateUserDto)

    return user;
  }

  remove(id: number) {
    this.users = this.users.filter(user => user.id !== id)

    return { id };
  }
}
