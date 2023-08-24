import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todosRepository.create(createTodoDto);
    return await this.todosRepository.save(newTodo);
  }

  async findAll(isDone?: boolean): Promise<Todo[]> {
    if (isDone === undefined) {
      return await this.todosRepository.find();
    }
    return await this.todosRepository.findBy({ isDone });
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException();
    }
    return await this.todosRepository.save({ ...todo, ...updateTodoDto });
  }

  async remove(id: number) {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException();
    }
    return this.todosRepository.remove(todo);
  }
}
