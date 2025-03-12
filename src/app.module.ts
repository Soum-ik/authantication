import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: () => ({
        secret: config().jwt.secret,
      }),
      inject: [ConfigModule],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        uri: config().database.uri,
      }),
      inject: [ConfigModule],
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
