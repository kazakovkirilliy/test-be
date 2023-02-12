import { Global, Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService, ConfigModule } from '@nestjs/config';

export const PUB_SUB = 'PUB_SUB';

console.log(process.env.REDIS_URL);

@Global()
@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: PUB_SUB,
      useFactory: (configService: ConfigService) =>
        new RedisPubSub({
          connection: configService.get('REDIS_URL'),
        }),
    },
  ],
  exports: [PUB_SUB],
})
export class PubsubModule {}
