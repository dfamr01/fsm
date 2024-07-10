import { Fsm, createMachine } from "../lib/fsm";
import { IFsmInput } from "../lib/fsm.interface";

interface TrafficLightContext {
  cycles: number;
}

const trafficLightConfig: IFsmInput<TrafficLightContext> = {
  id: "trafficLight",
  initial: "red",
  context: { cycles: 0 },
  states: {
    red: {
      _onEnter() {
        console.log("Entering red state");
      },
      _onExit() {
        console.log("Exiting red state");
      },
    },
    green: {
      _onEnter() {
        console.log("Entering green state");
      },
      _onExit() {
        console.log("Exiting green state");
      },
    },
    yellow: {
      _onEnter() {
        console.log("Entering yellow state");
      },
      _onExit() {
        this.assign((ctx) => ({ cycles: ctx.cycles + 1 }));
        console.log("Exiting yellow state");
      },
    },
  },
};

describe("Traffic Light Fsm", () => {
  let fsm: Fsm<TrafficLightContext>;

  beforeEach(() => {
    fsm = createMachine(trafficLightConfig);
  });

  test("should initialize with the correct state and context", () => {
    expect(fsm.state).toBe("red");
    expect(fsm.value).toEqual({ cycles: 0 });
  });

  test("should transition from red to green", () => {
    fsm.transition("green");
    expect(fsm.state).toBe("green");
  });

  test("should transition from green to yellow", () => {
    fsm.transition("green");
    fsm.transition("yellow");
    expect(fsm.state).toBe("yellow");
  });

  test("should transition from yellow to red and increment cycles", () => {
    fsm.transition("green");
    fsm.transition("yellow");
    fsm.transition("red");
    expect(fsm.state).toBe("red");
    expect(fsm.value).toEqual({ cycles: 1 });
  });

  test("should complete one full cycle and reset correctly", () => {
    fsm.transition("green");
    fsm.transition("yellow");
    fsm.transition("red");
    fsm.reset();
    expect(fsm.state).toBe("red");
    expect(fsm.value).toEqual({ cycles: 0 });
  });

  test("should handle multiple cycles correctly", () => {
    for (let i = 0; i < 3; i++) {
      fsm.transition("green");
      fsm.transition("yellow");
      fsm.transition("red");
    }
    expect(fsm.state).toBe("red");
    expect(fsm.value).toEqual({ cycles: 3 });
  });

  test("should call _onExit and _onEnter methods correctly", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    fsm.transition("green");
    expect(consoleSpy).toHaveBeenCalledWith("Exiting red state");
    expect(consoleSpy).toHaveBeenCalledWith("Entering green state");

    fsm.transition("yellow");
    expect(consoleSpy).toHaveBeenCalledWith("Exiting green state");
    expect(consoleSpy).toHaveBeenCalledWith("Entering yellow state");

    fsm.transition("red");
    expect(consoleSpy).toHaveBeenCalledWith("Exiting yellow state");
    expect(consoleSpy).toHaveBeenCalledWith("Entering red state");

    consoleSpy.mockRestore();
  });
});
