/**
 * Home page della applicazione
 */
import { FbArrowRightOutline } from "@/frontend";
import { Carousel, CustomFlowbiteTheme } from "flowbite-react";
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

          {/* <div id="default-carousel" className="flex-1" data-carousel="slide">


            <div className="QYPW4nl6nHaIbrtaXf4h hO0yYxbhE9M6AT6tnNx0 Odj8n83y7sKz4V0UfIxN _Qk4_E9_iLqcHsRZZ4ge YNGcLi5w6_FzyXJeyzRk">
              <div
                className="_rQfu5s_ozvMmIHvaipS sNk1Ftxlo5_azsr1wF3F _Qk4_E9_iLqcHsRZZ4ge iZ8W30HPRQAuO6al90LU EDIXK1RoLh9IsTGzcUBT yvRWkoRx_Apshie5g15o B_Mg78Zl0_AuSOcVLMGS _0PJkI8eA25FIbUKfI1v MN_MaEuEFmiXUnb4S5NS"
                data-carousel-item=""
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/ngo-carousel/image-1.jpg"
                  className="iZ8W30HPRQAuO6al90LU _Qk4_E9_iLqcHsRZZ4ge ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H wfpSIkDBCpd44vEdymO_ _mssRcs8MyBUGQj4V4fc kRnPsj4Hbdd46XYrDu14 c1ibYmNHw6Cxfcu_pPgz"
                  alt=""
                />
              </div>

              <div
                className="_rQfu5s_ozvMmIHvaipS sNk1Ftxlo5_azsr1wF3F _Qk4_E9_iLqcHsRZZ4ge iZ8W30HPRQAuO6al90LU EDIXK1RoLh9IsTGzcUBT yvRWkoRx_Apshie5g15o B_Mg78Zl0_AuSOcVLMGS _v8hjA9ct_v6OhSQD7fC _txZr_XzKh1AA2GR58P5"
                data-carousel-item=""
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/ngo-carousel/image-2.jpg"
                  className="iZ8W30HPRQAuO6al90LU _Qk4_E9_iLqcHsRZZ4ge ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H wfpSIkDBCpd44vEdymO_ _mssRcs8MyBUGQj4V4fc kRnPsj4Hbdd46XYrDu14 c1ibYmNHw6Cxfcu_pPgz"
                  alt=""
                />
              </div>

              <div
                className="_rQfu5s_ozvMmIHvaipS sNk1Ftxlo5_azsr1wF3F _Qk4_E9_iLqcHsRZZ4ge iZ8W30HPRQAuO6al90LU EDIXK1RoLh9IsTGzcUBT yvRWkoRx_Apshie5g15o B_Mg78Zl0_AuSOcVLMGS si0W4yw4peoOpbmHOl83 _v8hjA9ct_v6OhSQD7fC j2x7_17hqRVmwte_tWFa"
                data-carousel-item=""
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/ngo-carousel/image-3.jpg"
                  className="iZ8W30HPRQAuO6al90LU _Qk4_E9_iLqcHsRZZ4ge ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H wfpSIkDBCpd44vEdymO_ _mssRcs8MyBUGQj4V4fc kRnPsj4Hbdd46XYrDu14 c1ibYmNHw6Cxfcu_pPgz"
                  alt=""
                />
              </div>

              <div
                className="_rQfu5s_ozvMmIHvaipS sNk1Ftxlo5_azsr1wF3F _Qk4_E9_iLqcHsRZZ4ge iZ8W30HPRQAuO6al90LU EDIXK1RoLh9IsTGzcUBT yvRWkoRx_Apshie5g15o B_Mg78Zl0_AuSOcVLMGS si0W4yw4peoOpbmHOl83 _v8hjA9ct_v6OhSQD7fC j2x7_17hqRVmwte_tWFa"
                data-carousel-item=""
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/ngo-carousel/image-4.jpg"
                  className="iZ8W30HPRQAuO6al90LU _Qk4_E9_iLqcHsRZZ4ge ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H wfpSIkDBCpd44vEdymO_ _mssRcs8MyBUGQj4V4fc kRnPsj4Hbdd46XYrDu14 c1ibYmNHw6Cxfcu_pPgz"
                  alt=""
                />
              </div>

              <div
                className="_rQfu5s_ozvMmIHvaipS sNk1Ftxlo5_azsr1wF3F _Qk4_E9_iLqcHsRZZ4ge iZ8W30HPRQAuO6al90LU EDIXK1RoLh9IsTGzcUBT yvRWkoRx_Apshie5g15o B_Mg78Zl0_AuSOcVLMGS si0W4yw4peoOpbmHOl83 _v8hjA9ct_v6OhSQD7fC"
                data-carousel-item=""
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/ngo-carousel/image-5.jpg"
                  className="iZ8W30HPRQAuO6al90LU _Qk4_E9_iLqcHsRZZ4ge ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H wfpSIkDBCpd44vEdymO_ _mssRcs8MyBUGQj4V4fc kRnPsj4Hbdd46XYrDu14 c1ibYmNHw6Cxfcu_pPgz"
                  alt=""
                />
              </div>
            </div>

            <div className="iZ8W30HPRQAuO6al90LU _hiiNzR2vr3SrSW1a9Nq kqgYncRJQ7spwKfig6It B1cgbA6Bb4LQo0qFJKck wfpSIkDBCpd44vEdymO_ ZxCHyMvwEWnRu3Bz0A4k c1ibYmNHw6Cxfcu_pPgz">
              <button
                type="button"
                className="hDwBtOhIf4ji_OJlxtQ5 Har7ksLdj_gpHuS5dC3P n8e6ORKgPTnY6zgs5HS7 yjGyQxv8jnYk9_MGMqLN _cpMMPjFQqjJu4i0Puod"
                aria-current="true"
                aria-label="Slide 1"
                data-carousel-slide-to="0"
              ></button>
              <button
                type="button"
                className="hDwBtOhIf4ji_OJlxtQ5 Har7ksLdj_gpHuS5dC3P n8e6ORKgPTnY6zgs5HS7 b09gYy3albM7wXTWJAII _qJxewQ37gBGMMVf11hs djld5jFcbPSy1YdGoI7k GbuoIVQvgE1sPez3FB0O"
                aria-current="false"
                aria-label="Slide 2"
                data-carousel-slide-to="1"
              ></button>
              <button
                type="button"
                className="hDwBtOhIf4ji_OJlxtQ5 Har7ksLdj_gpHuS5dC3P n8e6ORKgPTnY6zgs5HS7 b09gYy3albM7wXTWJAII _qJxewQ37gBGMMVf11hs djld5jFcbPSy1YdGoI7k GbuoIVQvgE1sPez3FB0O"
                aria-current="false"
                aria-label="Slide 3"
                data-carousel-slide-to="2"
              ></button>
              <button
                type="button"
                className="hDwBtOhIf4ji_OJlxtQ5 Har7ksLdj_gpHuS5dC3P n8e6ORKgPTnY6zgs5HS7 b09gYy3albM7wXTWJAII _qJxewQ37gBGMMVf11hs djld5jFcbPSy1YdGoI7k GbuoIVQvgE1sPez3FB0O"
                aria-current="false"
                aria-label="Slide 4"
                data-carousel-slide-to="3"
              ></button>
              <button
                type="button"
                className="hDwBtOhIf4ji_OJlxtQ5 Har7ksLdj_gpHuS5dC3P n8e6ORKgPTnY6zgs5HS7 b09gYy3albM7wXTWJAII _qJxewQ37gBGMMVf11hs djld5jFcbPSy1YdGoI7k GbuoIVQvgE1sPez3FB0O"
                aria-current="false"
                aria-label="Slide 5"
                data-carousel-slide-to="4"
              ></button>
            </div>

            <button
              type="button"
              className="iZ8W30HPRQAuO6al90LU _ccvJ9JsfoF81kZ3lkJh _J57_xJ7KhmAX1D2Pnei _hiiNzR2vr3SrSW1a9Nq kqgYncRJQ7spwKfig6It neyUwteEn7DOg9pBSJJE _WclR59Ji8jwfmjPtOei j34KztD3SBxL_tQWzosr veFXkDzfJN473U3ycrV8 avTmsFU5TwHXQh07Ji35 __CB1NVTb04MHxDxK6Hw qHIOIw8TObHgD3VvKa5x"
              data-carousel-prev=""
            >
              <span className="ay0ziTPUL4Ag5d1DkSY7 neyUwteEn7DOg9pBSJJE _WclR59Ji8jwfmjPtOei _vZPglRSyqi4oTXg5L1_ _pwSRUXRHN5bHphyTRKz n8e6ORKgPTnY6zgs5HS7 l7P6mxe4mAJ2zI0n_j_P ZTVgTvkeLA77aHqzv1Xf z9T4SNS_TmJE5VjAh2jw WoC_bnXh95SNWLZQ8DPn fOxyUpClzf_Lcu2WSd5Q N0sVvA8e3kS5v8elltW7 _3B9zRCH2yooHY4rhXcW _IgVsIAj3uFo_o0V_rqA EH2isgaQ8TX5v1KnyqYs aUTxmIkyphwCjyCF3tr7">
                <FbCameraFotoSolid />
                <span className="BWabIWdbZ5qWNbPXxuBc">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="iZ8W30HPRQAuO6al90LU _ccvJ9JsfoF81kZ3lkJh AMjjbpqWkJRuIruRGJbg _hiiNzR2vr3SrSW1a9Nq kqgYncRJQ7spwKfig6It neyUwteEn7DOg9pBSJJE _WclR59Ji8jwfmjPtOei j34KztD3SBxL_tQWzosr veFXkDzfJN473U3ycrV8 avTmsFU5TwHXQh07Ji35 __CB1NVTb04MHxDxK6Hw qHIOIw8TObHgD3VvKa5x"
              data-carousel-next=""
            >
              <span className="ay0ziTPUL4Ag5d1DkSY7 neyUwteEn7DOg9pBSJJE _WclR59Ji8jwfmjPtOei _vZPglRSyqi4oTXg5L1_ _pwSRUXRHN5bHphyTRKz n8e6ORKgPTnY6zgs5HS7 l7P6mxe4mAJ2zI0n_j_P ZTVgTvkeLA77aHqzv1Xf z9T4SNS_TmJE5VjAh2jw WoC_bnXh95SNWLZQ8DPn fOxyUpClzf_Lcu2WSd5Q N0sVvA8e3kS5v8elltW7 _3B9zRCH2yooHY4rhXcW _IgVsIAj3uFo_o0V_rqA EH2isgaQ8TX5v1KnyqYs aUTxmIkyphwCjyCF3tr7">
                <FbVideoSolid />
                <span className="BWabIWdbZ5qWNbPXxuBc">Next</span>
              </span>
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
