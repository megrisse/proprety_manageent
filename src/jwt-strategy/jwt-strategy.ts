import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token: string = this.extractJwtFromCookie(request);
      const payload = this.jwtService.verify(token);
      if (!token) throw new UnauthorizedException('JWT token is missing');

      const user = this.userService.findOne(payload.username);

      if (!user) return false;
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  extractJwtFromCookie(req: Request): string | null {
    return req.cookies['jwt'];
  }
}
