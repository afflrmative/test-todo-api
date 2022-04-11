import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';
import { CreateDto, updateDto } from './dto';


@Controller('rest/todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){}

  @Get()
  getAllAction(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async getOneAction(@Param('id') id: string): Promise<Todo> {
    const todo = this.todoService.findOne(id);
    if (todo === undefined){
        throw new HttpException(
        'Todo with id=' + id + 'not exists', 
        HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  @Post()
  createAction(@Body() createDto: CreateDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createDto.title;
    if (createDto.isCompleted !== undefined){
        todo.isComplited = createDto.isCompleted;
    }
    return this.todoService.create(todo);
  }
//Create
  @Put(':id')
  async updateAction(
    @Param('id') id: string, 
    @Body() {title, isCompleted = false}: updateDto ): 
    Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined){
        throw new NotFoundException('Todo with id=' + id + 'not exists')
    }
    todo.title = title;
    todo.isComplited = isCompleted;
    return this.todoService.update(todo);
  }

  @Delete(':id')
  deleteAction(@Param('id') id: string): Promise<void>{
      return this.todoService.remove(id);
  }
}
