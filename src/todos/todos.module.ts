import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UsersModule } from 'src/users/users.module';
import { TodosProcessor } from './todos.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      configKey: 'todos',
      name: 'todos',
    }),
    TypeOrmModule.forFeature([Todo]),
    UsersModule,
  ],
  controllers: [TodosController],
  providers: [TodosService, TodosProcessor],
  exports: [TodosService],
})
export class TodosModule {}
