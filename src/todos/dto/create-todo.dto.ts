import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  todo: string;

  @IsOptional()
  @IsBoolean()
  isDone?: boolean;
}
