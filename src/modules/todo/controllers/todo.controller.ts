import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { CreateDto, updateDto } from './dto';


@Controller('rest/todo')
export class TodoController {

  @Get()
  getAllAction(): string {
    return "Todo get all";
  }

  @Get(':id')
  getOneAction(@Param('id') id: string): string {
    return "Todo get one by id=" + id;
  }

  @Post()
  createAction(@Body() todo: CreateDto): CreateDto {
    console.log(todo);
    return todo;
  }
//Create
  @Put(':id')
  updateAction(
    @Param('id') id: string, 
    @Body() todo: updateDto): updateDto {
    console.log('Search by ID', id)
    console.log(todo, 'saved');
    return todo;
  }

  @Delete(':id')
  deleteAction(@Param('id') id: string): string {
      return "Delete todo by id=" + id;
  }
}
