import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { EventsModule } from 'src/events/events.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({
      session: false,
    }),
    UsersModule,
    EventsModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        signOptions: { expiresIn: '2 days' },
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
