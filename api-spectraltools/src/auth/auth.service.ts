import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(user: UserDTO) {
    const USER_DB = await this.userRepository.findOne({
      where: [
        {
          email: user.email,
        },
      ],
    });
    if (await bcrypt.compare(user.password, USER_DB.password)) {
      return 'contraseña correcta';
    } else {
      return 'revisa tus crendeciales perrrrrrrrrrrro';
    }
  }

  async signIn(user: UserDTO) {
    const SALT = await bcrypt.genSalt();
    const HASHED_PSWD = await bcrypt.hash(user.password, SALT);
    const USER_DB = await this.userRepository.create({
      email: user.email,
      password: HASHED_PSWD,
    });
    return await this.userRepository.save(USER_DB);
  }
}
