import { BadRequestException, PipeTransform } from '@nestjs/common';

import { FlashcardTopic } from '../flashcard.model';

export class FlashcardTopicValidationPipe implements PipeTransform {
  private readonly _availableTopics = [
    FlashcardTopic.C_PLUS_PLUS,
    FlashcardTopic.C_SHARP,
    FlashcardTopic.GO,
    FlashcardTopic.JAVA,
    FlashcardTopic.JS,
    FlashcardTopic.PYTHON,
  ];

  transform(value: any): FlashcardTopic {
    value = value.toUpperCase();

    if (!this._isTopicValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid topic!`);
    }

    return value;
  }

  private _isTopicValid(topic: any): boolean {
    return this._availableTopics.includes(topic);
  }
}
