import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const LottiePlayer = ({
  ref,
  url = "",
  autoplay = true,
  loop = true,
  ...props
}) => {
  return (
    <div>
      <DotLottiePlayer
        ref={ref}
        src={url}
        autoplay={autoplay}
        loop={loop}
        {...props}
      >
        {/* <DotLottiePlayer src="../../assets/car.json" autoplay loop> */}
        {/* <Controls /> */}
      </DotLottiePlayer>
    </div>
  );
};

export default LottiePlayer;
