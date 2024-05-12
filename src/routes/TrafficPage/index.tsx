import { styled } from "@mui/material/styles";

import { createMachine, useMachine } from "../../utils/fsm";
import { Box } from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import LottiePlayer from "../../components/LottiePlayer";
import { useEffect, useState } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-react";

const Wrapper = styled(Box)`
  display: flex;
`;

const TrafficLightBG = styled(Box)`
  background-color: black;
  border-radius: 10px;
  padding: 2px;
  height: min-content;
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
});

stopLight.start();

const TrafficPage = () => {
  const [, value] = useMachine(stopLight);
  const [playerRef, setPlayerRef] = useState<DotLottie>();

  useEffect(() => {
    if (!playerRef) {
      return;
    }
    if (value === "red") {
      playerRef?.pause();
    }
    if (value === "yellow") {
      playerRef?.setSpeed(0.3);
    }
    if (value === "green") {
      playerRef?.setSpeed(1);

      playerRef?.play();
    }
  }, [playerRef, value]);

  return (
    <PageWrapper>
      <Wrapper>
        <LottiePlayer
          refCallBack={setPlayerRef}
          src={
            "https://livly-bucket.sfo3.digitaloceanspaces.com/yellowCar.json"
          }
          autoplay={false}
          loop={false}
        />
        <TrafficLightBG>
          <TrafficLight
            style={{ backgroundColor: value === "red" ? value : "" }}
          />
          <TrafficLight
            style={{ backgroundColor: value === "yellow" ? value : "" }}
          />
          <TrafficLight
            style={{ backgroundColor: value === "green" ? value : "" }}
          />
        </TrafficLightBG>
      </Wrapper>
    </PageWrapper>
  );
};
export default TrafficPage;
