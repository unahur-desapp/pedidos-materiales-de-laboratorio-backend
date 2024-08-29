import { ConfigModule, ConfigService } from '@nestjs/config';

export const JwtModuleProvider = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
  }),
  inject: [ConfigService],
};
