import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  FlashcardStatusValidationPipe,
  FlashcardTopicValidationPipe,
} from './pipes';
import { CreateFlashcardDto, FlashcardFilterDto } from './dto';
import { Flashcard, FlashcardStatus, FlashcardTopic } from './flashcard.model';
import { FlashcardsService } from './flashcards.service';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly _flashcardsService: FlashcardsService) {}

  @Get()
  getFlashCards(
    @Body(ValidationPipe) filterDto: FlashcardFilterDto
  ): Array<Flashcard> {
    if (Object.keys(filterDto).length) {
      return this._flashcardsService.getFlashcardsByFilter(filterDto);
    }

    return this._flashcardsService.getAllFlashcards();
  }

  @Get('/:id')
  getFlashCardById(@Param('id') id: string): Flashcard {
    return this._flashcardsService.getFlashcardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createFlashcard(@Body() createFlashcardDto: CreateFlashcardDto): Flashcard {
    return this._flashcardsService.createFlashcard(createFlashcardDto);
  }

  @Delete('/:id')
  deleteFlashcard(@Param('id') id: string): void {
    return this._flashcardsService.deleteFlashcard(id);
  }

  @Patch('/:id')
  updateFlashcard(
    @Param('id') id: string,
    @Body('topic', FlashcardTopicValidationPipe) topic: FlashcardTopic,
    @Body('status', FlashcardStatusValidationPipe) status: FlashcardStatus
  ): Flashcard {
    return this._flashcardsService.updateFlashcard(id, topic, status);
  }
}
