import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Delete,
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto } from 'src/dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { JwtStrategy } from 'src/jwt-strategy/jwt-strategy';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userServices: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({ status: 200, description: 'Successful login', type: String })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() req, @Res() res: Response) {
    const user: userDto = await this.userServices.findOne(req.username);
    if (!user) {
      res.status(401).send('user not found');
      throw new UnauthorizedException('user not found');
    }
    const access_token = await this.authService.login(user);
    res.cookie('jwt', access_token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.send({ message: 'Logged in Succefully' });
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: userDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Res() res: Response, @Body() userDto) {
    const user = await this.userServices.findOne(userDto.username);
    if (user) {
      res.status(400).send('user already registred');
      throw new BadRequestException('user already registred');
    }
    const token = await this.authService.register(userDto);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.send({ message: 'User registred Succefully' });
  }

  @UseGuards(JwtStrategy)
  @Get('users')
  async allUsers() {
    return this.userServices.getAllUsers();
  }
  @UseGuards(JwtStrategy)
  @Delete('users')
  async delete(@Body() user: userDto) {
    return this.userServices.remove(user.username);
  }
}
