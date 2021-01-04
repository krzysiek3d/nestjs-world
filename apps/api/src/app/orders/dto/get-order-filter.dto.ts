import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

import { OrderStatus } from '../order.model';

export class GetOrderFilterDto {
  @IsOptional()
  @IsIn([
    OrderStatus.OPEN,
    OrderStatus.IN_PROGRESS,
    OrderStatus.CANCEL,
    OrderStatus.DONE,
  ])
  status: OrderStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
