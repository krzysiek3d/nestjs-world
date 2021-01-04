import { Injectable, NotFoundException } from '@nestjs/common';

import { GetOrderFilterDto, CreateOrderDto } from './dto';
import { Order, OrderStatus } from './order.model';

@Injectable()
export class OrdersService {
  private _orders: Array<Order> = [];

  getAllOrders(): Array<Order> {
    return this._orders;
  }

  getOrdersWithFilters(filterDto: GetOrderFilterDto): Array<Order> {
    const { status, search } = filterDto;
    let orders = this.getAllOrders();

    if (status) {
      orders = orders.filter((order) => order.status === status);
    }

    if (search) {
      orders = orders.filter(
        ({ name, description }) =>
          name.includes(search) || description.includes(search)
      );
    }

    return orders;
  }

  getOrderById(id: string): Order {
    const foundOrder = this._orders.find((order) => order.id === id);

    if (!foundOrder) {
      throw new NotFoundException(`Order with ID "${id}" not found!`);
    }

    return foundOrder;
  }

  createOrder(createOrderDto: CreateOrderDto): Order {
    const { name, description } = createOrderDto;
    const order = {
      id: '1234' + Math.random(),
      name,
      description,
      status: OrderStatus.OPEN,
    };

    this._orders.push(order);

    return order;
  }

  deleteOrder(id: string): void {
    this._orders = this._orders.filter((order) => order.id !== id);
  }

  updateOrderStatus(id: string, status: OrderStatus): Order {
    const order = this.getOrderById(id);
    order.status = status;

    return order;
  }
}
