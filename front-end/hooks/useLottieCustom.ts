import { LottieComponentProps, useLottie } from "lottie-react";

type Play = {
  autoplay: boolean,
  loop: boolean,
};

export function useLottieCustom (animation: any, style: React.CSSProperties, play?: Play) {
  const options: LottieComponentProps  = {
    animationData: animation,
    autoplay: play?.autoplay ? play.autoplay : false,
    loop: play?.loop ? play.loop : false,  
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const lottieObj = useLottie(options, style);

  return { ...lottieObj };
};