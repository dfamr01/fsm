import { Box, Typography } from "@mui/material";
import { styled, css } from "@mui/material/styles";
import PageWrapper from "../../components/PageWrapper";

import { createMachine, useMachine } from "../../utils/fsm";

const data = [
  {
    question: "In which year was Intuit founded?",
    answer: "c",
    explanation:
      "Intuit was founded in 1983 by Scott Cook and Tom Proulx, who initially focused on software to help people manage their personal finances.",
    options: {
      a: "1980",
      b: "1985",
      c: "1983",
      d: "1990",
    },
  },
  {
    question:
      "Which of the following is one of Intuit's flagship products focused on tax preparation?",
    answer: "a",
    explanation:
      "TurboTax is one of Intuit's flagship products, providing tax preparation software primarily aimed at individuals and small businesses.",
    options: {
      a: "TurboTax",
      b: "Microsoft Excel",
      c: "Salesforce CRM",
      d: "Google Sheets",
    },
  },
  {
    question:
      "Which Intuit product is primarily used by small businesses for accounting purposes?",
    answer: "b",
    explanation:
      "QuickBooks is an accounting software developed by Intuit that is widely used by small businesses for managing their finances.",
    options: {
      a: "Mint",
      b: "QuickBooks",
      c: "TurboTax",
      d: "ProConnect",
    },
  },
  {
    question:
      "Which Intuit product provides personal finance services like budgeting and credit score management?",
    answer: "d",
    explanation:
      "Mint is an Intuit product that offers free personal finance services like budgeting, tracking expenses, and managing credit scores.",
    options: {
      a: "Shopify",
      b: "Xero",
      c: "FreshBooks",
      d: "Mint",
    },
  },
];

const trivia = createMachine({
  context: {
    currentQuestion: 0,
    isDone: false,
    data: data,
    score: 0,
    totalQuestions: data.length,
    correctAnswers: 0,
    wrongAnswers: 0,
  },
  id: "trivia",
  initial: "start",
  states: {
    start: {
      _onEnter() {
        this.transition("showQuestion");
      },
    },
    showQuestion: {
      _onEnter() {
        if (!this.value?.data) {
          throw new Error("no question to display");
        }
      },
    },
    correctAnswer: {
      _onEnter() {
        this.assign((ctx) => {
          ctx.correctAnswers++;
          ctx.score += Number(((1 / ctx.totalQuestions) * 100).toFixed(2));
          return ctx;
        });
        this.transition("nextQuestion");
      },
    },
    wrongAnswer: {
      _onEnter() {
        this.assign((ctx) => {
          ctx.wrongAnswers++;
          return ctx;
        });
        this.transition("nextQuestion");
      },
    },
    nextQuestion: {
      _onEnter() {
        this.assign((ctx) => {
          const timer = setTimeout(() => {
            ctx.currentQuestion++;
            if (ctx.currentQuestion >= ctx.totalQuestions) {
              this.transition("endGame");
            } else {
              this.transition("showQuestion");
            }

            clearTimeout(timer);
          }, 100);
          // }, 1500);

          return ctx;
        });
      },
    },
    endGame: {
      _onEnter() {},
    },
  },
});

import coverImage from "../../assets/cover.png";
import TriviaOptions from "./components/TriviaOptions";
import { useEffect, useState } from "react";
import EndGame from "../TriviaEndGamePage";
import { useNavigate } from "react-router-dom";
import { FSM_PAGES } from "../../utils/constants";

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${coverImage});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  height: 100%;
`;

export const Title = styled(Typography)`
  font-size: 2rem;
  color: white;
`;

export const TriviaWrap = styled(Box)`
  max-width: 900px;
  width: 80%;
  margin: auto;
`;

export const StatsBar = styled(Box)`
  margin: 20px 10px;
  color: black;
  border: 3px solid #a2a0a1;
  border-radius: 10px;
  padding: 20px 15px;
  background: rgba(255, 255, 255, 0.8);
  font-weight: bold;
`;

export const Question = styled(Box)`
  color: white;
  border: 3px solid #a2a0a1;
  border-radius: 15px;
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);

  height: 3rem;
  margin-bottom: 20px;
`;

const TriviaPage = () => {
  const navigate = useNavigate();
  const [state, value, transition] = useMachine(trivia);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (state === "showQuestion") {
      setSelectedOption("");
    }
  }, [state]);

  useEffect(() => {
    if (state === "endGame") {
      navigate(FSM_PAGES.triviaEnd.to);
    }
  }, [state, navigate, value.score]);

  useEffect(() => {
    trivia.start();
    return () => {
      trivia.reset();
    };
  }, []);

  const onSelectOption = (key: string) => {
    setSelectedOption(key);
    if (value.data[value.currentQuestion].answer === key) {
      transition("correctAnswer");
    } else {
      transition("wrongAnswer");
    }
  };

  return (
    <PageWrapper>
      <Wrapper>
        {state === "endGame" ? (
          <EndGame score={value?.score} />
        ) : (
          <>
            <StatsBar>
              {`
        ${(value?.currentQuestion || 0) + 1} of 
        ${value?.totalQuestions} Score: ${value?.score}`}
            </StatsBar>
            {/* <Title>Welcome To FSM Trivia</Title> */}
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
