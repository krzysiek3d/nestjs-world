import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateFlashcardDto, FlashcardFilterDto } from './dto';
import { Flashcard, FlashcardStatus, FlashcardTopic } from './flashcard.model';

@Injectable()
export class FlashcardsService {
  private _flashcards: Array<Flashcard> = [];

  getAllFlashcards(): Array<Flashcard> {
    return this._flashcards;
  }

  getFlashcardsByFilter(filterDto: FlashcardFilterDto): Array<Flashcard> {
    const { search, topic, status } = filterDto;

    let flashcards = this._flashcards;

    if (search) {
      flashcards = flashcards.filter(
        ({ name, description }) =>
          name.includes(search) || description.includes(search)
      );
    }
    if (topic) {
      flashcards = flashcards.filter((flashcard) => flashcard.topic === topic);
    }
    if (status) {
      flashcards = flashcards.filter(
        (flashcard) => flashcard.status === status
      );
    }

    return flashcards;
  }

  getFlashcardById(id: string): Flashcard {
    const foundFlashcard = this._flashcards.find(
      (flashcard) => flashcard.id === id
    );

    if (!foundFlashcard) {
      throw new NotFoundException(`Flashcard with ID "${id}" not found!`);
    }

    return foundFlashcard;
  }

  createFlashcard(createFlashcardDto: CreateFlashcardDto): Flashcard {
    const { name, description, topic } = createFlashcardDto;
    const newFlashcard: Flashcard = {
      id: '123' + Math.random(),
      name,
      description,
      topic,
      status: FlashcardStatus.OPEN,
    };

    this._flashcards.push(newFlashcard);

    return newFlashcard;
  }

  deleteFlashcard(id: string): void {
    const foundFlashcard = this.getFlashcardById(id);

    this._flashcards = this._flashcards.filter(
      (flashcard) => flashcard.id !== foundFlashcard.id
    );
  }

  updateFlashcard(
    id: string,
    topic: FlashcardTopic,
    status: FlashcardStatus
  ): Flashcard {
    const flashcard = this.getFlashcardById(id);

    if (topic) {
      flashcard.topic = topic;
    }

    if (status) {
      flashcard.status = status;
    }

    return flashcard;
  }
}
