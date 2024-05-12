import { createMachine, useMachine } from "../../utils/fsm";
import PageWrapper from "../../components/PageWrapper";
import LottiePlayer from "../../components/LottiePlayer";
import { useEffect, useState } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-react";
import { Wrapper, TrafficLightBG, TrafficLight } from "./traffic-light.styles";
import { TRAFFIC_LIGHT_FSM } from "./traffic-light.const";

const stopLight = createMachine(TRAFFIC_LIGHT_FSM);

const TrafficPage = () => {
  const [, value] = useMachine(stopLight);
  const [playerRef, setPlayerRef] = useState<DotLottie>();

  useEffect(() => {
    if (!playerRef) {
      return;
    }

    if (value === "red") {
      playerRef.pause();
    }
    if (value === "yellow") {
      playerRef.setSpeed(0.3);
    }
    if (value === "green") {
      playerRef.setSpeed(1);

      playerRef.play();
    }
  }, [playerRef, value]);

  useEffect(() => {
    stopLight.start();
    return () => {
      stopLight.reset();
    };
  }, []);

  return (
    <PageWrapper>
      <Wrapper>
        <LottiePlayer
          refCallBack={setPlayerRef}
          src={
            "https://livly-bucket.sfo3.digitaloceanspaces.com/yellowCar.json"
          }
          autoplay={true}
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
