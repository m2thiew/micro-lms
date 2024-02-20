/**
 * src/frontend/lib/flowbite.ts
 *
 * configurazioni per componenti flowbite.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { type CustomFlowbiteTheme } from "flowbite-react";

// ------------------------------------------------------------------------------------------------

/**
 * Apsetto personalizzato del carousel (homepage)
 */
export const carouselCustomTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "relative w-full h-full",
    leftControl:
      "bg-gray-500/50 absolute rounded-xl rounded-tr-none rounded-br-none top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "bg-gray-500/50 absolute rounded-xl rounded-tl-none rounded-bl-none top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
};

// ------------------------------------------------------------------------------------------------

/**
 * Aspetto carousel preview dei file caricati.
 */
export const carouselFileUploadInputTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "relative w-full h-full",
    leftControl:
      "absolute top-[calc(50%-1.5rem)] left-[0.5rem] flex h-12 items-center justify-center focus:outline-none",
    rightControl:
      "absolute top-[calc(50%-1.5rem)] right-[0.5rem] flex h-12 items-center justify-center focus:outline-none",
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 sm:h-10 sm:w-10",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg snap-x indiana-scroll-container indiana-scroll-container--hide-scrollbars",
    snap: "",
  },
  indicators: {
    wrapper:
      "absolute bottom-5 bg-gray-500/75 py-1 px-2 rounded-md left-1/2 flex -translate-x-1/2 space-x-3",
  },
};
