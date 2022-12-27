import { GetServerSideProps } from "next";
import Image from "next/image";
import { parseCookies } from "nookies";
import Layout from "../../components/Layout";
import { SEO } from "../../Seo";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { Cardholder, LockKey } from "phosphor-react";

import { SliderComponent } from "../../components/SliderComponent";
import { SwiperSlide, SwiperProps } from "swiper/react";

import logoVisaAndMaster from "../../assets/imgs/visa-master.png";
import logoPaypal from "../../assets/imgs/paypal.png";
import boleto from "../../assets/imgs/bo.png";
import logoPix from "../../assets/imgs/pix-logo.png";

const settingsSwiper: SwiperProps = {
  autoplay: false,
  slidesPerView: 2,
  centeredSlides: false,
};

export default function Recharge() {
  return (
    <Layout>
      <SEO title="Recarga" description="Faça uma recarga" />
      <main className="w-full h-full pb-8">
        <form id="payment-form" onSubmit={() => {}} className="pb-8">
          <div className="min-w-screen flex items-start justify-center px-5 pb-10 pt-16">
            <div
              className="w-full mx-auto rounded-lg bg-white shadow-lg border-2 px-12 pb-12 pt-5 text-gray-700 max-desk600:px-0"
              style={{ maxWidth: "600px" }}
            >
              <div className="w-full pt-1 pb-5">
                <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                  <Cardholder width={30} height={30} />
                </div>
              </div>

              <div className="mb-10">
                <h1 className="text-center font-bold text-xl uppercase">
                  Recarga segura
                </h1>
              </div>

              <div className="mb-3 flex flex-wrap -mx-2 max-[884px]:gap-1 max-desk600:hidden">
                <div className="px-2">
                  <label
                    htmlFor="type1"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type1"
                      defaultChecked
                    />
                    <Image
                      src={logoVisaAndMaster}
                      width={100}
                      className="h-8 ml-3"
                      alt="Visa e Mastercard"
                    />
                  </label>
                </div>

                <div className="px-2">
                  <label
                    htmlFor="type2"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type2"
                      defaultChecked
                    />
                    <Image
                      src={logoPix}
                      width={70}
                      height={undefined}
                      className="h-9  ml-3"
                      alt="pix"
                    />
                  </label>
                </div>

                <div className="px-2">
                  <label
                    htmlFor="type3"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type3"
                    />
                    <Image
                      src={logoPaypal}
                      width={55}
                      height={55}
                      className="h-8 ml-3 border-2 border-blue-700 rounded-sm px-1"
                      alt="paypal"
                    />
                  </label>
                </div>

                <div className="px-2">
                  <label
                    htmlFor="type4"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type4"
                    />
                    <Image
                      src={boleto}
                      width={55}
                      height={undefined}
                      className="h-8 ml-3"
                      alt="boleto"
                    />
                  </label>
                </div>
              </div>

              <div className="hidden w-full mb-3 max-desk600:flex">
                <SliderComponent settings={settingsSwiper}>
                  <SwiperSlide className="pl-12">
                    <div className="px-2">
                      <label
                        htmlFor="type1"
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-indigo-500"
                          name="type"
                          id="type1"
                          defaultChecked
                        />
                        <Image
                          src={logoVisaAndMaster}
                          width={90}
                          height={undefined}
                          className="h-8  ml-3"
                          alt="Visa e Mastercard"
                        />
                      </label>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="px-2">
                      <label
                        htmlFor="type2"
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-indigo-500"
                          name="type"
                          id="type2"
                          defaultChecked
                        />
                        <Image
                          src={logoPix}
                          width={80}
                          height={undefined}
                          className="h-10 ml-3"
                          alt="pix"
                        />
                      </label>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="">
                      <label
                        htmlFor="type3"
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-indigo-500"
                          name="type"
                          id="type3"
                        />
                        <Image
                          src={logoPaypal}
                          width={70}
                          height={undefined}
                          className="h-8 ml-3 border-2 border-blue-700 rounded-sm px-1"
                          alt="paypal"
                        />
                      </label>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide style={{ width: "30px" }}>
                    <div className="px-2">
                      <label
                        htmlFor="type4"
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-indigo-500"
                          name="type"
                          id="type4"
                        />
                        <Image
                          src={boleto}
                          width={55}
                          height={undefined}
                          className="h-8 ml-3"
                          alt="boleto"
                        />
                      </label>
                    </div>
                  </SwiperSlide>
                </SliderComponent>
              </div>

              <div className="max-desk600:px-12">
                <div className="mb-3">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Nome no cartão
                  </label>
                  <div>
                    <input
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Gabriel Silva"
                      type="text"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Número do cartão
                  </label>
                  <div>
                    <input
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="0000 0000 0000 0000"
                      type="number"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 -mx-2 flex items-end">
                  <div className="px-2 w-1/2">
                    <label className="font-bold text-sm mb-2 ml-1">
                      Data de expiração
                    </label>
                    <div>
                      <select
                        required
                        className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                      >
                        <option value="01">01 - Janeiro</option>
                        <option value="02">02 - Fevereiro</option>
                        <option value="03">03 - Março</option>
                        <option value="04">04 - Abril</option>
                        <option value="05">05 - Maio</option>
                        <option value="06">06 - Junho</option>
                        <option value="07">07 - Julho</option>
                        <option value="08">08 - Agosto</option>
                        <option value="09">09 - Setembro</option>
                        <option value="10">10 - Outubro</option>
                        <option value="11">11 - Novembro</option>
                        <option value="12">12 - Dezembro</option>
                      </select>
                    </div>
                  </div>
                  <div className="px-2 w-1/2">
                    <select
                      required
                      className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                    >
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                    </select>
                  </div>
                </div>

                <div className="mb-10">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Código de segurança
                  </label>
                  <div>
                    <input
                      className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="000"
                      max={3}
                      type="number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <button className="w-full max-w-xs mx-auto flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                    <LockKey width={30} height={30} />
                    <span>FINALIZAR</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { ["ng.token"]: token } = parseCookies(ctx);

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
