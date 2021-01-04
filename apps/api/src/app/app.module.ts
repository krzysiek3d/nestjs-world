import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { OrdersModule } from './orders/orders.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    FlashcardsModule,
    OrdersModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
