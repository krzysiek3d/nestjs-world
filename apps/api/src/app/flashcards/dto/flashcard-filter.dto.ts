import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

import { FlashcardStatus, FlashcardTopic } from '../flashcard.model';

export class FlashcardFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsIn([
    FlashcardTopic.C_PLUS_PLUS,
    FlashcardTopic.C_SHARP,
    FlashcardTopic.GO,
    FlashcardTopic.JAVA,
    FlashcardTopic.JS,
    FlashcardTopic.PYTHON,
  ])
  topic: string;

  @IsOptional()
  @IsIn([FlashcardStatus.DONE, FlashcardStatus.OPEN])
  status: string;
}
