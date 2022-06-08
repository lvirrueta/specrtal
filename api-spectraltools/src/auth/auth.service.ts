import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './common/dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './JWT/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  // Start Controller
  async login(user: UserDTO) {
    const USER_DB = await this.findOneByEmail(user.email);
    if (USER_DB) {
      if (await bcrypt.compare(user.password, USER_DB.password)) {
        return {
          access_token: await this.returnToken(user),
        };
      } else {
        return new ForbiddenException('Verifica tus credenciales');
      }
    } else {
      return new ForbiddenException('Verifica tus credenciales');
    }
  }

  async signIn(user: UserDTO) {
    const HASHED_PSWD = await this.hashPassword(user.password);
    const USER_DB = await this.userRepository.create({
      email: user.email,
      password: HASHED_PSWD,
    });
    if (this.userRepository.save(USER_DB)) {
      return true;
    } else {
      return false;
    }
  }
  // End Controller
  private async hashPassword(password: string): Promise<string> {
    const SALT = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, SALT);
  }

  private async returnToken(user: UserDTO): Promise<string> {
    const payload: JwtPayload = {
      email: user.email,
    };
    return await this.jwtService.sign(payload);
  }

  private async findOneByEmail(email: string): Promise<UserEntity> {
    const USER_DB = await this.userRepository.findOne({
      where: [
        {
          email: email,
        },
      ],
    });
    return USER_DB;
  }
}
