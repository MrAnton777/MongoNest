import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, InjectConnection } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { Book, BookDocument } from '../schemas/book.schema';
import { Model,Connection, } from 'mongoose';


describe('BookService',()=>{

    let service:BooksService
    let model:Model<BookDocument>

    beforeEach(async ()=>{
        let module: TestingModule = await Test.createTestingModule({
            providers:[
                BooksService,
                {
                    provide:getModelToken(Book.name),
                    useValue:{
                        find:jest.fn(),
                        findByIdAndUpdate:jest.fn().mockResolvedValue([]),
                        findByIdAndDelete: jest.fn().mockResolvedValue([]),
                        create: jest.fn().mockResolvedValue([]),
                        save: jest.fn().mockResolvedValue([]),
                    }
                },
            ]
        }).compile()

        service = module.get<BooksService>(BooksService)
        model = module.get<Model<BookDocument>>(getModelToken(Book.name))
    })

    describe('getAll',()=>{
        test('Should return an array of books',async ()=>{
            let result = [{title:"Testdata" ,description: "TestData" ,author:"TestData"}];
            (model.find as jest.Mock).mockResolvedValue(result);

            expect(await service.getAll()).toBe(result)
            expect(model.find).toHaveBeenCalled()


        })
    })

    describe('update', () => {
        test('should update a book', async () => {
          const book = {title:"Testdata" ,description: "TestData" ,author:"TestData"};
          const updatedBook = { _id: '1', ...book };
          (model.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedBook);
    
          expect(await service.update('1', book)).toBe(updatedBook);
          expect(model.findByIdAndUpdate).toHaveBeenCalledWith({ _id: '1' }, book);
        });
      });


      describe('create',()=>{
        test('Create book',async ()=>{
            let book = {title:"Testdata" ,description: "TestData" ,author:"TestData"}
            let createdBook = {_id:'1',...book};
            (model.create as jest.Mock).mockResolvedValue(createdBook);

            expect(await service.create(book)).toBe(createdBook)
            expect(model.create).toHaveBeenCalledWith(book);
        })
      })

      describe('delete',()=>{
        test('delete',async()=>{
            const deletedBook = { _id: '1', title: 'Deleted Book', author: 'Deleted Author' };
            (model.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedBook);

            expect(await service.delete('1')).toBe(deletedBook)
            expect(model.findByIdAndDelete).toHaveBeenCalledWith({_id:'1'})
        })
      })

})