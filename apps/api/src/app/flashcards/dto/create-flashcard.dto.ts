import { IsIn, IsNotEmpty } from 'class-validator';
import { FlashcardTopic } from '../flashcard.model';

export class CreateFlashcardDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsIn([
    FlashcardTopic.C_PLUS_PLUS,
    FlashcardTopic.C_SHARP,
    FlashcardTopic.GO,
    FlashcardTopic.JAVA,
    FlashcardTopic.JS,
    FlashcardTopic.PYTHON,
  ])
  topic: FlashcardTopic;
}
