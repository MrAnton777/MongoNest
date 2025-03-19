import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { INestApplication } from '@nestjs/common';
import { create } from 'domain';
import { AppController } from 'src/app.controller';
import * as request from 'supertest';


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
            
            return request(app.getHttpServer())
            .get('/books')
            .expect(200)
            .expect([])
        })
    })


    describe('create',()=>{
        test('create book',async()=>{
            const book = { title: 'New Book', desc:'3232',author: 'New Author' };
            const createdBook = { _id: '1', ...book };
            
        })
    })

})
import supertest from 'supertest';
