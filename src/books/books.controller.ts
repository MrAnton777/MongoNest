import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';

import { BookDocument } from '../schemas/book.schema';
import { BooksService } from './books.service';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';

import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';


@Controller('books')
export class BooksController{
    constructor(private readonly booksService: BooksService){}

    @Get()
    public getAll():Promise<BookDocument[]>{
        return this.booksService.getAll()
    }

    @Post()
    public create(@Body() body:CreateBookDto): Promise<BookDocument>{
        return this.booksService.create(body)
    }

    @Put(':id')
    public update(
        @Param() {id} ,
        @Body() body: UpdateBookDto
    ): Promise<BookDocument|null>{
        return this.booksService.update(id,body)
    }

    @Delete(':id')
    public delete(@Param() {id}): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.booksService.delete(id)
        
    }
}