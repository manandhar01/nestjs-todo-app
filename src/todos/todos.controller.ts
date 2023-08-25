import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @Request() req,
    @Body(new ValidationPipe()) createTodoDto: CreateTodoDto,
  ) {
    return this.todosService.create(createTodoDto, req.user.username);
  }

  @Get()
  findAll(@Request() req) {
    return this.todosService.findAll(req.user.username);
  }

  @Get('completed')
  findAllCompleted(@Request() req) {
    return this.todosService.findAll(req.user.username, true);
  }

  @Get('notcompleted')
  findAllNotCompleted(@Request() req) {
    return this.todosService.findAll(req.user.username, false);
  }
  @Get(':id')
  findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.todosService.findOne(id, req.user.username);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, req.user.username, updateTodoDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id, req.user.username);
  }
}
