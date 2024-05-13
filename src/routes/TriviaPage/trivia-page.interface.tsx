interface ITriviaDataElement {
  question: string;
  answer: string;
  explanation: string;
  options: Record<string, string>;
}

type TTriviaData = ITriviaDataElement[];

export type { TTriviaData };
