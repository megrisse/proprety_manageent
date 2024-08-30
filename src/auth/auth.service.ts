import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { userDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: userDto) {
    const User: userDto = await this.userService.findOne(user.username);
    const payload = { username: User.username, sub: User.id };
    const res = this.jwtService.sign(payload);
    return res;
  }

  async register(user: userDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const User: userDto = await this.userService.create({ ...user, password: hashedPassword });
    const payload = { username: User.username, sub: User.id };
    const res = this.jwtService.sign(payload);
    return res;
  }
}
