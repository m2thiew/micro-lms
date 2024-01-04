/**
 * Home page della applicazione
 */

import { FbAddressCardSolid, FbAdressBookOutline, FbTextSlashOutline } from "@/frontend";
import { BsCircleFill } from "react-icons/bs";
import { TbCircleKey } from "react-icons/tb";

export default function Home() {
  return (
    <main>
      <p>Hello Micro LMS</p>
      <div>
        <div className="relative mx-auto h-[600px] w-[300px] rounded-[2.5rem] border-[14px] border-gray-800 bg-gray-800 dark:border-gray-800">
          <div className="absolute -start-[17px] top-[72px] h-[32px] w-[3px] rounded-s-lg bg-gray-800 dark:bg-gray-800"></div>
          <div className="absolute -start-[17px] top-[124px] h-[46px] w-[3px] rounded-s-lg bg-gray-800 dark:bg-gray-800"></div>
          <div className="absolute -start-[17px] top-[178px] h-[46px] w-[3px] rounded-s-lg bg-gray-800 dark:bg-gray-800"></div>
          <div className="absolute -end-[17px] top-[142px] h-[64px] w-[3px] rounded-e-lg bg-gray-800 dark:bg-gray-800"></div>
          <div className="h-[572px] w-[272px] overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-light.png"
              className="h-[572px] w-[272px] dark:hidden"
              alt=""
            ></img>
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-dark.png"
              className="hidden h-[572px] w-[272px] dark:block"
              alt=""
            ></img>
          </div>
        </div>
      </div>
      <hr></hr>
      <div>
        <ol className="relative border-s border-red-200 dark:border-gray-700">
          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              February 2022
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Application UI code in Tailwind CSS
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              Get access to over 20+ pages including a dashboard layout, charts, kanban board,
              calendar, and pre-order E-commerce & Marketing pages.
            </p>
            <a
              href="#"
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Learn more{" "}
              <svg
                className="ms-2 h-3 w-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              March 2022
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Marketing UI design in Figma
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              All of the pages and components are first designed in Figma and we keep a parity
              between the two versions even as we update the project.
            </p>
          </li>
          <li className="ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              April 2022
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              E-Commerce UI code in Tailwind CSS
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Get started with dozens of web components and interactive elements built on top of
              Tailwind CSS.
            </p>
          </li>
        </ol>
      </div>
      <hr></hr>
      <div>
        <svg
          className="h-6 w-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            // strokeWidth="2"
            d="M4.828 10h6.239m-6.239 4h6.239M6 1v4a1 1 0 0 1-1 1H1m14-4v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
          />
        </svg>
        <br />
      </div>
      <hr></hr>
      <div>
        <FbAddressCardSolid />
        <FbAddressCardSolid className="h-12 w-12 bg-white text-red-500" />
        <FbAdressBookOutline />
        <FbAdressBookOutline strokeWidth={0.5} />
        <FbTextSlashOutline className="h-12 w-12 bg-white text-red-500" stroke="currentColor" />
        <span className="h-6 w-6 text-gray-800 dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="h-12 w-12 bg-white text-red-500"
            viewBox="0 0 16 16"
          >
            <path d="M7.895 8.174c.808 0 1.535-.528 1.535-1.594s-.668-1.676-1.56-1.676c-.838 0-1.517.616-1.517 1.659 0 1.072.708 1.61 1.54 1.61Z" />
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5.777 12.146c-1.593 0-2.425-.89-2.52-1.798h1.296c.1.357.539.72 1.248.72 1.36 0 1.88-1.353 1.834-3.023h-.076c-.235.627-.873 1.184-1.934 1.184-1.395 0-2.566-.961-2.566-2.666 0-1.711 1.242-2.731 2.87-2.731 1.512 0 2.971.867 2.971 4.014 0 2.836-1.02 4.3-3.123 4.3" />
          </svg>
        </span>
        <span className="h-6 w-6 text-gray-800 dark:text-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="h-12 w-12 bg-white text-red-500"
          >
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1" />
            <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
          </svg>
        </span>
        hello
        <TbCircleKey className="h-12 w-12  text-red-500" />
        <BsCircleFill className="h-12 w-12  text-red-500" />
        <hr />
        <TbCircleKey className="h-6 w-6 text-gray-800 dark:text-white" />
        <BsCircleFill className="h-6 w-6 text-gray-800 dark:text-white" />
        <hr />
        <TbCircleKey />
        <BsCircleFill />
      </div>
      <div className="h-48"></div>
    </main>
  );
}
