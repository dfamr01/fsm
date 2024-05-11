import { createMachine } from "../../utils/fsm/lib/fsm";
import { useMachine } from "../../utils/fsm/lib/fsm.hooks";
const stopLight = createMachine({
  context: "",
  id: "stopLight",
  initial: "green",
  states: {
    green: {
      // _onEnter is a special handler that is invoked
      // immediately as the FSM transitions into the new state
      _onEnter: function () {
        const timer = setTimeout(() => {
          this.transition("yellow");
          clearTimeout(timer);
        }, 3000);
        this.assign("green");
      },
      // _onExit is a special handler that is invoked just before
      // the FSM leaves the current state and transitions to another
      _onExit: function () {
        console.log("exit green");
      },
    },
    yellow: {
      _onEnter: function () {
        this.assign("yellow");

        const timer = setTimeout(() => {
          this.transition("red");
          clearTimeout(timer);
        }, 3000);

        // this.emit("value", { status: GREEN });
      },
      _onExit: function () {},
    },
    red: {
      _onEnter: function () {
        this.assign("red");

        const timer = setTimeout(() => {
          this.reset();
          clearTimeout(timer);
        }, 3000);
      },

      _onExit: function () {},
    },
  },
});
stopLight.start();
// stopLight.assign()
const Home = ({}) => {
  const [state, value] = useMachine(stopLight);
  return (
    <>
      <div style={{ backgroundColor: value }}>{state}</div>
    </>
  );
};
export default Home;
