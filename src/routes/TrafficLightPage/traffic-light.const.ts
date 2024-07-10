import { IFsmInput } from "../../utils/fsm/lib/fsm.interface";

const TRANSITION_TIME = 1500;

export const TRAFFIC_LIGHT_FSM: IFsmInput<string> = {
  context: "",
  id: "stopLight",
  initial: "green",
  states: {
    green: {
      // _onEnter is a special handler that is invoked
      // immediately as the FSM transitions into the new state
      _onEnter: function () {
        this.assign("green");

        const timer = setTimeout(() => {
          this.transition("yellow");
          clearTimeout(timer);
        }, TRANSITION_TIME);
      },
      // _onExit is a special handler that is invoked just before
      // the FSM leaves the current state and transitions to another
      _onExit: function () {
        // console.log("exit red");
      },
    },
    yellow: {
      _onEnter: function () {
        this.assign("yellow");

        const timer = setTimeout(() => {
          this.transition("red");
          clearTimeout(timer);
        }, TRANSITION_TIME);
      },
      _onExit: function () {},
    },
    red: {
      _onEnter: function () {
        this.assign("red");

        const timer = setTimeout(() => {
          this.start();
          clearTimeout(timer);
        }, TRANSITION_TIME);
      },

      _onExit: function () {},
    },
  },
};
