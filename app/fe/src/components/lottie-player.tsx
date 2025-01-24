import Lottie from "react-lottie-player";
import lottieRunningDeer from "../../public/lottie/running-dear.json";

type PropsForLottie = {
  width?: any;
  height?: any;
  loop?: boolean;
  play?: boolean;
  goTo?: number;
};

export function LottieRunningDeer(params: PropsForLottie) {
  return (
    <Lottie
      loop={params.loop || false}
      animationData={lottieRunningDeer}
      play
      style={{ width: params.width, height: params.height }}
    />
  );
}
