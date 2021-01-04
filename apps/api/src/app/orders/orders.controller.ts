import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Order, OrderStatus } from './order.model';
import { CreateOrderDto, GetOrderFilterDto } from './dto';
import { OrderStatusValidationPipe } from './pipes';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly _ordersService: OrdersService) {}

  @Get()
  getOrders(@Query(ValidationPipe) filterDto: GetOrderFilterDto): Array<Order> {
    if (Object.keys(filterDto).length) {
      return this._ordersService.getOrdersWithFilters(filterDto);
    }

    return this._ordersService.getAllOrders();
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string): Order {
    return this._ordersService.getOrderById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createOrder(@Body() createOrderDto: CreateOrderDto): Order {
    return this._ordersService.createOrder(createOrderDto);
  }

  @Patch('/:id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body('status', OrderStatusValidationPipe) status: OrderStatus
  ): Order {
    return this._ordersService.updateOrderStatus(id, status);
  }

  @Delete('/:id')
  deleteOrder(@Param('id') id: string): void {
    return this._ordersService.deleteOrder(id);
  }
}
