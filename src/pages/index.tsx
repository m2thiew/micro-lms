/**
 * Home page della applicazione
 */

import { useLoginPopupForm } from "@/frontend/features/login/context/popup-form";
import { useLoginStatus } from "@/frontend/features/login/context/status";
import { carouselCustomTheme } from "@/frontend/lib/flowbite";
import { PrimaryButton, PrimaryLink, SubmitButton } from "@/frontend/ui/buttons";
import { FbBookSolid } from "@/frontend/ui/icons/flowbite";
import { Carousel } from "flowbite-react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { default as assetCarousel01 } from "/public/assets/carousel01.png";
import { default as assetCarousel02 } from "/public/assets/carousel02.png";
import { default as assetCarousel03 } from "/public/assets/carousel03.png";

// ------------------------------------------------------------------------------------------------

export default function Home() {
  // stato login.
  const login = useLoginStatus();
  const loginPopupForm = useLoginPopupForm();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Micro LMS</title>
      </Head>
      <div className="grid grid-rows-2 gap-12 lg:grid-cols-2">
        {/* testo introduttivo */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-black">Benvenuto in Micro LMS</h1>

          <p className="mt-4 text-lg">
            Micro LMS è un learning management system semplice da usare e veloce da capire.
          </p>
          <div className="mt-4">
            <PrimaryButton
              className="text-xl"
              onClick={() => {
                loginPopupForm.open();
              }}
            >
              accedi
            </PrimaryButton>
          </div>
        </div>

        {/* carousel */}
        <div>
          <Carousel theme={carouselCustomTheme} className="h-80 rounded-xl bg-white">
            <Image src={assetCarousel01} alt="carousel 01" className="h-80 w-auto" />
            <Image src={assetCarousel02} alt="carousel 02" className="h-80 w-auto" />
            <Image src={assetCarousel03} alt="carousel 03" className="h-80 w-auto" />
          </Carousel>
        </div>
      </div>
    </>
  );
}
