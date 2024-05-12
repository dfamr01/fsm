import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";

interface IProps {
  src: string;
  refCallBack: (_: DotLottie) => void;
  autoplay: boolean;
  loop: boolean;
}

const LottiePlayer = ({
  src = "",
  refCallBack,
  autoplay = true,
  loop = true,
  ...props
}: IProps) => {
  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    refCallBack(dotLottie);
  };

  return (
    <DotLottieReact
      {...props}
      src={src}
      loop={loop}
      autoplay={autoplay}
      dotLottieRefCallback={dotLottieRefCallback}
    />
  );
};

export default LottiePlayer;
