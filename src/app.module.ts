import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/books"),
    BooksModule
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
