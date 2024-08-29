import { ConfigModule, ConfigService } from '@nestjs/config';

export const RefreshTokenProvider = {
  provides: 'REFRESH_TOKEN',
  global: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('REFRESH_TOKEN_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('REFRESH_TOKEN_EXPIRATION') || '30d',
    },
  }),
};

export const AccessTokenProvider = {
  provides: 'ACCESS_TOKEN',
  global: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRATION') || '15m',
    },
  }),
};
