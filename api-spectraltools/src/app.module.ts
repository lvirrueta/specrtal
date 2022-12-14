import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PlaguePlotModule } from './plague-plot/plague-plot.module';
import { DiscardModule } from './discard/discard.module';
import { SpectralModule } from './spectral/spectral.module';

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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    PlaguePlotModule,
    DiscardModule,
    SpectralModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
