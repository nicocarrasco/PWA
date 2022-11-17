import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { UserDocument } from '../users/user.schema';
import { LoginDto } from './_utils/dto/request/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDocument> {
    let user = await this.usersRepository.findOneByUsername(username);
    if (!user) user = await this.usersRepository.create(username, pass);
    if (user && compareSync(pass, user.password)) return user;
    throw new UnauthorizedException('WRONG_CREDENTIALS');
  }

  async login(login: LoginDto) {
    const user = await this.validateUser(login.username, login.password);
    const payload = { id: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: this.usersService.getCurrentUser(user),
    };
  }
}
