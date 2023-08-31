import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TodosService } from 'src/todos/todos.service';
import { CreateTodoDto } from 'src/todos/dto/create-todo.dto';
import * as csvtojson from 'csvtojson';

@Processor('files')
export class FileProcessor {
  constructor(private readonly todosService: TodosService) {}

  @Process('process-file')
  async processFile(job: Job): Promise<void> {
    const todos = await csvtojson().fromFile(job.data.path);

    todos.forEach(async (todo) => {
      const newTodo: CreateTodoDto = {
        todo: todo.todo,
        isDone: todo.isDone === 'true' ? true : false,
      };
      const insertedTodo = await this.todosService.createTodo(
        newTodo,
        parseInt(todo.userId),
      );
      console.log(insertedTodo);
    });

    console.log('Job processing completed.');
  }
}
