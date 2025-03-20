import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { INestApplication } from '@nestjs/common';
import { create } from 'domain';
import { AppController } from 'src/app.controller';
import * as request from 'supertest';
import { SuperTest } from 'supertest';
import { Book, BookDocument } from 'src/schemas/book.schema';


describe('BooksController',()=>{
    let controller:BooksController;
    let service:jest.Mocked<BooksService>
    let app:INestApplication;

    beforeEach(async()=>{
        let moduleFixture= await Test.createTestingModule({
            controllers:[BooksController],
            providers:[{provide:BooksService,useValue:{
                getAll:jest.fn() as jest.Mock,
                create:jest.fn() as jest.Mock,
                update:jest.fn() as jest.Mock,
                delete:jest.fn() as jest.Mock
            }}],
        }).compile()

        app = moduleFixture.createNestApplication()
        service = moduleFixture.get<BooksService>(BooksService) as jest.Mocked<BooksService>
        await app.init()
    })

    describe('get',()=>{
        test('getAll',async ()=>{
            service.getAll.mockResolvedValue([])
            
            return request(app.getHttpServer())
            .get('/books')
            .expect(200)
            .expect([])
        })
    })


    describe('create',()=>{
        test('create book',async()=>{
            const book = { title: 'New Book', desc:'3232' ,author: 'New Author' };
            const createdBook = { _id: '1', ...book } as BookDocument;
            service.create.mockResolvedValue(createdBook)

            return request(app.getHttpServer())
                .post('/books')
                .send(book)
                .expect(201)
                .expect(createdBook)


        })
    })


    describe("update",()=>{
        test('Update book',async ()=>{
            let book = { title: 'Book', desc:'3232' ,author: 'New Author' };
            let updatedBook = {_id:1,...book} as BookDocument;
            service.update.mockResolvedValue(updatedBook);

            return request(app.getHttpServer())
                .put('/books/1')
                .send(book)
                .expect(200)
                .expect(updatedBook)
        })
    })


    describe("delete",()=>{
        test('Delete book',async ()=>{
            const deletedBook: any= {
                _id: '1',
                title: 'Deleted Book',
                desc: 'Deleted Description',
                author: 'Deleted Author',
                __v:0,
              };

              service.delete.mockResolvedValue(deletedBook);
        
              return request(app.getHttpServer())
                .delete('/books/1')
                .expect(200)
                .expect(deletedBook);

        })
    })

})
