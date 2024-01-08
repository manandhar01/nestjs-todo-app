import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'config/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { FilesModule } from './files/files.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    BullModule.forRoot('todos', {
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.forRoot('files', {
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TodosModule,
    UsersModule,
    AuthModule,
    FilesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
