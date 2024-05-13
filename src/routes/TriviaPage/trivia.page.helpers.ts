import { createMachine } from "../../utils/fsm";
import { TTriviaData } from "./trivia-page.interface";

export function createTriviaMachine(triviaData?: TTriviaData) {
  if (!triviaData) {
    return undefined;
  }
  const triviaMachine = createMachine({
    context: {
      currentQuestion: 0,
      isDone: false,
      data: triviaData,
      score: 0,
      totalQuestions: triviaData?.length,
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
            }, 1000);

            return ctx;
          });
        },
      },
      endGame: {
        _onEnter() {},
      },
    },
  });
  return triviaMachine;
}
