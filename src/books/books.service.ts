import { Injectable } from '@nestjs/common';
import { Model, Connection, HydratedDocument, QueryWithHelpers} from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from "../schemas/book.schema";

import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';


@Injectable()
export class BooksService{
    constructor(
        @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    ){}

    public getAll(): Promise<BookDocument[]>{
        return this.BookModel.find()
    }

    public create(body:CreateBookDto):Promise<BookDocument>{
        const book = this.BookModel.create(body)
        return book
    }

    public update(id:string,body:UpdateBookDto): Promise<BookDocument| null>{
        return this.BookModel.findByIdAndUpdate({_id:id},body)

    }

    public delete(id:string): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findByIdAndDelete({_id:id})
        
    }
}
