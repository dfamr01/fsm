import PageWrapper from "../../components/PageWrapper";
import { useMachine } from "../../utils/fsm";

import TriviaOptions from "./components/TriviaOptions";
import { useEffect, useState } from "react";
import EndGame from "./components/TriviaEndGame";
import { Wrapper, StatsBar, TriviaWrap, Question } from "./trivia-page.styles";
import { useFetchData } from "../../hooks/utils.hooks";
import { createTriviaMachine } from "./trivia.page.helpers";
import CircularProgressLoad from "../../components/CircularProgressLoad";
import { TTriviaData } from "./trivia-page.interface";

const TriviaPage = () => {
  const [isFetching, triviaData] = useFetchData("/trivia-questions");
  const [triviaStateMachine, setTriviaStateMachine] = useState(
    createTriviaMachine(triviaData as TTriviaData)
  );

  const { state, value, transition, start, reset } =
    useMachine(triviaStateMachine);

  useEffect(() => {
    if (triviaData) {
      const machine = createTriviaMachine(triviaData as TTriviaData);
      setTriviaStateMachine(machine);
    }
  }, [triviaData]);

  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (state === "showQuestion") {
      setSelectedOption("");
    }
  }, [state]);

  useEffect(() => {
    start();
    return () => {
      reset();
    };
  }, [start, reset]);

  const onSelectOption = (key: string) => {
    setSelectedOption(key);
    if (value?.data[value?.currentQuestion].answer === key) {
      transition("correctAnswer");
    } else {
      transition("wrongAnswer");
    }
  };

  const onRestartClick = () => {
    start();
  };

  if (isFetching || !triviaData || !value) {
    return <CircularProgressLoad />;
  }

  return (
    <PageWrapper>
      <Wrapper>
        {state === "endGame" ? (
          <EndGame score={value?.score} onRestartClick={onRestartClick} />
        ) : (
          <>
            <StatsBar>
              {`
        ${(value?.currentQuestion || 0) + 1} of 
        ${value?.totalQuestions} Score: ${value?.score}`}
            </StatsBar>
            <TriviaWrap>
              <Question>{value?.data[value.currentQuestion].question}</Question>
              <TriviaOptions
                options={value.data[value.currentQuestion].options}
                onSelect={onSelectOption}
                disableOptions={state !== "showQuestion"}
                selectedOption={selectedOption}
                correctAnswer={value.data[value.currentQuestion].answer}
                showAnswer={[
                  "correctAnswer",
                  "wrongAnswer",
                  "nextQuestion",
                ].includes(state || "")}
              />
            </TriviaWrap>
          </>
        )}
      </Wrapper>
    </PageWrapper>
  );
};

export default TriviaPage;
