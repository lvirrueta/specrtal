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
      host: process.env.DBHOST,
      username: process.env.DBUSER,
      password: process.env.DBPASS,
      database: process.env.DBNAME,
      entities: ['./**/*.entity.js'],
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
