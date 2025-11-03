
export interface VocabularyWord {
  english: string;
  vietnamese: string;
}

export interface VocabularyTopic {
  id: number;
  title: string;
  vietnameseTitle: string;
  words: VocabularyWord[];
}
