export interface Flashcard {
  id: string;
  name: string;
  description: string;
  topic: FlashcardTopic;
  status: FlashcardStatus;
}

export enum FlashcardTopic {
  JS = 'JavaScript',
  JAVA = 'Java',
  C_SHARP = 'C#',
  C_PLUS_PLUS = 'C++',
  PYTHON = 'PYTHON',
  GO = 'GO',
}

export enum FlashcardStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
}
