import { BadRequestException, PipeTransform } from '@nestjs/common';

import { OrderStatus } from '../order.model';

export class OrderStatusValidationPipe implements PipeTransform {
  private readonly _validStatuses = [
    OrderStatus.OPEN,
    OrderStatus.DONE,
    OrderStatus.IN_PROGRESS,
    OrderStatus.CANCEL,
  ];

  transform(value: any): OrderStatus {
    value = value.toUpperCase();

    if (!this._isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status!`);
    }

    return value;
  }

  private _isStatusValid(status: any): boolean {
    return this._validStatuses.includes(status);
  }
}
