import { Injectable } from '@nestjs/common';
import { Model, Connection, HydratedDocument, QueryWithHelpers } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from "../schemas/book.schema";

import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';

@Injectable()
export class BooksService{
    constructor(
        @InjectModel(Book.name) private BookModel: Model<BookDocument>,
        @InjectConnection() private connection: Connection,
    ){}

    public getAll(): Promise<BookDocument[]>{
        return this.BookModel.find().exec()
    }

    public create(body:CreateBookDto):Promise<BookDocument>{
        const book = new this.BookModel(body)
        return book.save()
    }

    public update(id,body:UpdateBookDto): Promise<BookDocument| null>{
        return this.BookModel.findByIdAndUpdate({_id:id},body)

    }

    public delete(id): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findByIdAndDelete({_id:id})
        
    }
}
