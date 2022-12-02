import { Swiper, SwiperProps } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperComponentProps {
  settings?: SwiperProps;
  children: React.ReactNode;
};

export const settingsDefault: SwiperProps = {
  spaceBetween: -20,
  slidesPerView: 2,
  centeredSlides: false,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination:  {
    clickable: true,
    type: 'bullets'
  },
  navigation: false,
  modules: [Autoplay, Pagination, Navigation],
  effect: "slide"
};


export function SliderComponent ({ settings,  children }: SwiperComponentProps) {
  return (<Swiper {...settings || settingsDefault}>{children}</Swiper>);
};