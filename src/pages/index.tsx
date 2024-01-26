/**
 * Home page della applicazione
 */

import { useLoginPopupForm } from "@/frontend/features/login/context/popup-form";
import { FbArrowRightOutline } from "@/frontend/ui/icons/FlowbiteIcons";
import { Carousel, type CustomFlowbiteTheme } from "flowbite-react";
import Image from "next/image";
import { default as assetCarousel01 } from "/public/assets/carousel01.png";
import { default as assetCarousel02 } from "/public/assets/carousel02.png";
import { default as assetCarousel03 } from "/public/assets/carousel03.png";

// Personalizzazione apsetot carousel.

const themeCarousel: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "relative w-full h-full",
    leftControl:
      "bg-gray-500/50 absolute rounded-xl rounded-tr-none rounded-br-none top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "bg-gray-500/50 absolute rounded-xl rounded-tl-none rounded-bl-none top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
};

export default function Home() {
  const loginPopupForm = useLoginPopupForm();

  return (
    <section>
      <div className="mx-36 my-12">
        <div className="my-12 flex flex-row gap-12">
          <div className="flex-1">
            <div>
              <h2 className="text-4xl font-extrabold text-black">Benvenuto in MicroLMS</h2>

              <p className="mt-2 text-lg">
                Micro LMS è un learning management system semplice da usare e veloce da capire.
              </p>
            </div>

            <div className="mt-4">
              <a
                href="#"
                title=""
                className="ml-2 rounded-lg bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
                role="button"
                onClick={() => {
                  loginPopupForm.open();
                }}
              >
                Accedi
              </a>

              <a
                href="#"
                className="ml-2 inline-flex items-center px-5 py-2.5 text-lg font-medium  text-blue-600 hover:underline"
              >
                Le mie pillole
                <FbArrowRightOutline className="ml-2 h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="flex-1">
            <Carousel theme={themeCarousel} className="h-80 rounded-xl bg-white">
              <Image src={assetCarousel01} alt="carousel 01" className="h-80 w-auto" />
              <Image src={assetCarousel02} alt="carousel 02" className="h-80 w-auto" />
              <Image src={assetCarousel03} alt="carousel 03" className="h-80 w-auto" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
