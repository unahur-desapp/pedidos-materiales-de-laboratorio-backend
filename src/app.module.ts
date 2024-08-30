import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseProvider from './config/mongoose.provider';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthGuardProvider } from './config/auth-guard.provider';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(MongooseProvider),
    AuthModule,
  ],
  controllers: [],
  providers: [AuthGuardProvider],
})
export class AppModule {}
