import { CacheModule, Module } from '@nestjs/common';
import { EnrollmentRequestsService } from './enrollment-requests.service';
import { EnrollmentsResolver } from './enrollment-requests.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { EventsService } from 'src/events/events.service';

@Module({
  imports: [
    CacheModule.register({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get('REDIS_URL'),
      }),
    }),
  ],
  providers: [
    EnrollmentsResolver,
    EnrollmentRequestsService,
    PrismaService,
    EventsService,
  ],
  exports: [EnrollmentRequestsService],
})
export class EnrollmentRequestsModule {}
