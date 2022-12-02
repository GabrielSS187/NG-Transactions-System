import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Money, Wallet } from "phosphor-react";
import { SwiperSlide } from "swiper/react";

import { SliderComponent } from "../SliderComponent";

interface IProps {
  valueReceivedTotal: string;
  valueSentTotal: string;
};

export default function CardsDashboard({ valueSentTotal, valueReceivedTotal }: IProps) {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="flex justify-center flex-wrap gap-5 w-full mb-5 max-md:hidden">
        <div className="h-36 w-64 font-semibold flex flex-col justify-between shadow-lg border-2 rounded-lg">
          <h3 className="p-1 text-sm">Valor em conta</h3>
          <div className="text-center text-xl text-green-400">
            <h3>R$ {user?.balance}</h3>
          </div>
          <div className="self-end px-1">
            <Wallet size={36} className="text-green-400" />
          </div>
        </div>

        <div className="h-36 w-64 font-semibold flex flex-col justify-between shadow-lg border-2 rounded-lg">
          <h3 className="p-1 text-sm">Valor total recebido</h3>
          <div className="text-center text-xl text-blue-400">
            <h3>R$ {valueReceivedTotal}</h3>
          </div>
          <div className="self-end px-1">
            <Money size={36} className="text-blue-400" />
          </div>
        </div>

        <div className="h-36 w-64 font-semibold flex flex-col justify-between shadow-lg border-2 rounded-lg">
          <h3 className="p-1 text-sm">Valor total enviado.</h3>
          <div className="text-center text-xl text-red-600">
            <h3>R$ {valueSentTotal}</h3>
          </div>
          <div className="self-end px-1">
            <Money size={36} className="text-red-600" />
          </div>
        </div>
      </div>

      <SliderComponent>
        <SwiperSlide>
          <div className="h-36 w-64  font-semibold flex flex-col justify-between shadow-lg border-2 rounded-lg">
            <h3 className="p-1 text-sm max-desk850:text-xs">Valor em conta</h3>
            <div className="text-center text-xl text-green-400">
              <h3>R$ {user?.balance}</h3>
            </div>
            <div className="self-end px-1">
              <Wallet size={36} className="text-green-400" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-36 w-64  font-semibold flex flex-col justify-between shadow-lg border-2 rounded-lg">
            <h3 className="p-1 text-sm max-desk850:text-xs">
              Valor total recebido
            </h3>
            <div className="text-center text-xl text-blue-400">
              <h3>R$ {valueReceivedTotal}</h3>
            </div>
            <div className="self-end px-1">
              <Money size={36} className="text-blue-400" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-36 w-64  font-semibold flex flex-col justify-between shadow-lg border-2 rounded-lg">
            <h3 className="p-1 text-sm max-desk850:text-xs">
              Valor total enviado.
            </h3>
            <div className="text-center text-xl text-red-600">
              <h3>R$ {valueSentTotal}</h3>
            </div>
            <div className="self-end px-1">
              <Money size={36} className="text-red-600" />
            </div>
          </div>
        </SwiperSlide>
      </SliderComponent>
    </>
  );
}
