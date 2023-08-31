import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { BullModule } from '@nestjs/bull';
import { FilesService } from './files.service';
import { FileProcessor } from './file.processor';
import { TodosModule } from 'src/todos/todos.module';

@Module({
  imports: [
    BullModule.registerQueue({
      configKey: 'files',
      name: 'files',
    }),
    TodosModule,
  ],
  controllers: [FilesController],
  providers: [FilesService, FileProcessor],
})
export class FilesModule {}
