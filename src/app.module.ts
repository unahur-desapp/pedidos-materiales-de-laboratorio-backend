import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongooseProvider from './config/mongoose.provider';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthGuardProvider } from './auth/providers/auth-guard.provider';
import  { EquipmentModule } from './equipment/equipment.module';
import { EquipmentController } from './equipment/equipment.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(MongooseProvider),
    AuthModule,
    EquipmentModule
  ],
  controllers: [],
  providers: [AuthGuardProvider],
})
export class AppModule {}
