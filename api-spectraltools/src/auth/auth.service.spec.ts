import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockImplementation(() => {
              return {
                id: 5,
                email: 'lvirrueta@innmortal.com',
                password:
                  '$2b$10$l.p2H5zbL0Dhowo3xD2kGunSg8ZM9gQPnTCEwCZR1hxKFN3LoPX9u',
              };
            }),
          },
        },
        AuthService,
        JwtService,
        UserEntity,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('UserRepository should be defined ', () => {
    expect(userRepository).toBeDefined();
  });

  it('should return a token', async () => {
    expect(
      await service.login({
        email: 'lvirrueta@innmortal.com',
        password: '123',
      }),
    ).toEqual([
      {
        access_token: expect.any(String),
      },
    ]);
  });
});
