import {
  Wrap,
  Option,
  KeyCaption,
  ValueCaption,
} from "./trivia-options.styles";

interface ITriviaProps {
  options: Record<string, string>;
  onSelect: (key: string) => void;
  disableOptions: boolean;
  selectedOption?: string;
  correctAnswer: string;
  showAnswer: boolean;
}

const TriviaOptions = ({
  options,
  onSelect,
  disableOptions,
  selectedOption,
  correctAnswer,
  showAnswer,
}: ITriviaProps) => {
  return (
    <Wrap>
      {Object.entries(options).map(([key, value]) => {
        return (
          <Option
            key={key}
            onClick={() => {
              onSelect(key);
            }}
            is_correct={+(showAnswer && correctAnswer && correctAnswer === key)}
            is_selected={+(!!selectedOption && selectedOption === key)}
            disabled={disableOptions}
          >
            <KeyCaption>{key}</KeyCaption>
            <ValueCaption>{value}</ValueCaption>
          </Option>
        );
      })}
    </Wrap>
  );
};

export default TriviaOptions;
