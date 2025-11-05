import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './config/db.config';


@Module({
  imports: [ConfigModule, DatabaseConfigModule],
})
export class AppModule {}
