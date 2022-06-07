import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'spectral-tools.cn6mqn4l6en2.us-east-2.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'MxoNSOJRhJfF0Rv7CvwJcCefkzaasrtj',
      database: 'spectral-tools',
      entities: [ (__dirname + '/**/*.entity{.ts,.js}') ],
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
