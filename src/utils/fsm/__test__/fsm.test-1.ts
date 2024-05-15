import { Fsm, IFsmInput, createMachine } from "../lib/fsm";

interface TestContext {
  value: number;
}

const fsmConfig: IFsmInput<TestContext> = {
  id: "testFsm",
  initial: "idle",
  context: { value: 0 },
  states: {
    idle: {
      _onEnter() {
        console.log("Entering idle state");
      },
      _onExit() {
        console.log("Exiting idle state");
      },
    },
    active: {
      _onEnter() {
        console.log("Entering active state");
      },
      _onExit() {
        console.log("Exiting active state");
      },
    },
  },
};

describe("Fsm Class", () => {
  let fsm: Fsm<TestContext>;

  beforeEach(() => {
    fsm = createMachine(fsmConfig);
  });

  test("should initialize with the correct state and context", () => {
    expect(fsm.state).toBe("idle");
    expect(fsm.value).toEqual({ value: 0 });
  });

  test("should transition between states correctly", () => {
    fsm.transition("active");
    expect(fsm.state).toBe("active");
  });

  test("should assign new context values correctly", () => {
    fsm.assign({ value: 10 });
    expect(fsm.value).toEqual({ value: 10 });

    fsm.assign((ctx) => ({ value: ctx.value + 5 }));
    expect(fsm.value).toEqual({ value: 15 });
  });

  test("should emit events correctly", (done) => {
    fsm.on("state", (state) => {
      expect(state).toBe("active");
      done();
    });
    fsm.transition("active");
  });
});
