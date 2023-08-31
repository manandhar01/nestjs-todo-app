import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    private usersService: UsersService,
  ) {}

  async createTodo(createTodo: CreateTodoDto, userId: number) {
    const todo = await this.todosRepository.findOne({
      where: { todo: createTodo.todo, user: { id: userId } },
    });

    if (todo) {
      return todo;
    }

    const user = await this.usersService.findById(userId);

    return this.todosRepository.save({ ...createTodo, user });
  }

  async create(createTodoDto: CreateTodoDto, username: string): Promise<Todo> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const newTodo = this.todosRepository.create({ ...createTodoDto, user });
    await this.todosRepository.save(newTodo);
    return await this.todosRepository.findOneBy({ id: newTodo.id });
  }

  async findAll(username: string, isDone?: boolean): Promise<Todo[]> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (isDone === undefined) {
      return await this.todosRepository.findBy({
        user: { username },
      });
    }
    return await this.todosRepository.findBy({ user: { username }, isDone });
  }

  async findOne(id: number, username: string): Promise<Todo> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const todo = await this.todosRepository.findOneBy({
      user: { username },
      id,
    });
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async update(
    id: number,
    username: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const todo = await this.todosRepository.findOneBy({
      user: { username },
      id,
    });
    if (!todo) {
      throw new NotFoundException();
    }
    return await this.todosRepository.save({ ...todo, ...updateTodoDto });
  }

  async remove(id: number, username: string) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const todo = await this.todosRepository.findOneBy({
      user: { username },
      id,
    });
    if (!todo) {
      throw new NotFoundException();
    }
    return this.todosRepository.remove(todo);
  }
}
