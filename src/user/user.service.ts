import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { userDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(user: userDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async remove(username: string): Promise<User> {
    const user = await this.findOne(username);
    if (user) return this.userRepository.remove(user);
  }
}
