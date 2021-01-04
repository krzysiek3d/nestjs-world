import { BadRequestException, PipeTransform } from '@nestjs/common';

import { FlashcardStatus } from '../flashcard.model';

export class FlashcardStatusValidationPipe implements PipeTransform {
  private readonly _availableStatuses = [
    FlashcardStatus.DONE,
    FlashcardStatus.OPEN,
  ];

  transform(value: any): FlashcardStatus {
    value = value.toUpperCase();

    if (!this._isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status!`);
    }

    return value;
  }

  private _isStatusValid(status: any): boolean {
    return this._availableStatuses.includes(status);
  }
}
