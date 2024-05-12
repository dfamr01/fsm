import { styled } from "@mui/material/styles";

import { createMachine, useMachine } from "../../utils/fsm";
import { Box } from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import LottiePlayer from "../../components/LottiePlayer";
import { PlayerEvents } from "@dotlottie/react-player";
import { useEffect, useRef } from "react";

const Wrapper = styled(Box)`
  display: flex;
`;

const TrafficLightBG = styled(Box)`
  background-color: black;
  border-radius: 10px;
  padding: 2px;
`;

const TrafficLight = styled(Box)`
  --dim: 50px;
  background-color: gray;
  margin: 5px;
  width: var(--dim);
  height: var(--dim);
  border-radius: 50%;
`;

const TRANSITION_TIME = 1500;
const stopLight = createMachine({
  context: "",
  id: "stopLight",
  initial: "green",
  states: {
    uninitialized: {
      _onEnter() {
        this.assign("");
        const timer = setTimeout(() => {
          this.start();

          // this.transition("green");
          clearTimeout(timer);
        }, 400);
      },
    },
    green: {
      // _onEnter is a special handler that is invoked
      // immediately as the FSM transitions into the new state
      _onEnter: function () {
        this.assign("green");

        const timer = setTimeout(() => {
          this.transition("yellow");
          clearTimeout(timer);
        }, 1500);
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
        }, 1100);
      },
      _onExit: function () {},
    },
    red: {
      _onEnter: function () {
        this.assign("red");

        const timer = setTimeout(() => {
          this.transition("uninitialized");

          // this.start();
          clearTimeout(timer);
        }, 1100);
      },

      _onExit: function () {},
    },
  },
});

stopLight.start();

const TrafficPage = ({}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, value, transition] = useMachine(stopLight);
  const playerRef = useRef(null);
  // const [playerRef, setPlayerRef] = useState(null);

  useEffect(() => {
    if (value === "red") {
      playerRef.current?.stop();
    }
  }, [value]);

  return (
    <PageWrapper>
      <Wrapper>
        <TrafficLightBG>
          <TrafficLight style={{ backgroundColor: value === "red" && value }} />
          <TrafficLight
            style={{ backgroundColor: value === "yellow" && value }}
          />
          <TrafficLight
            style={{ backgroundColor: value === "green" && value }}
          />
        </TrafficLightBG>
        <LottiePlayer
          ref={playerRef}
          onEvent={(event: PlayerEvents) => {
            console.log("🚀 ~ TrafficPage ~ event:", event);

            if (event === PlayerEvents.LoopComplete) {
              // transition("uninitialized");
              console.log("🚀 ~ TrafficPage ~ event222:", event);
            }
          }}
          url={
            "https://lottie.host/96bf00d6-8779-45ee-b9dd-3c7ab08ca80b/YsGp1R258a.json"

            // "https://lottie.host/855794a9-d03d-4ec0-868f-fdcaa1a065af/KQ3r5VPEyn.json"
          }
        />
      </Wrapper>
    </PageWrapper>
  );
};
export default TrafficPage;
