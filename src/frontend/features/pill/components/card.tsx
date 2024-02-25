/**
 * src/frontend/features/pill/components/card.tsx
 *
 * Coponente che espone la card di una pillola
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { FbCheckCircleSolid, FbCheckOutline } from "@/frontend/ui/icons/flowbite";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

// ------------------------------------------------------------------------------------------------

type PillCardProp = Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "title" | "description"> & {
  id: number;
  title: string;
  description?: string;
  href?: string;
  thumbPath?: string;
  thumbSvg?: React.JSX.Element;
  viewed?: boolean;
};

// ------------------------------------------------------------------------------------------------

export const PillCard = React.forwardRef<HTMLDivElement, PillCardProp>(
  (props, ref): React.JSX.Element => {
    const { className, children, id, title, description, href, thumbPath, thumbSvg, viewed } =
      props;
    const mergedClassName = twMerge("mx-auto max-w-screen-xl p-4 text-gray-500", className);

    // fascia per indicare la presa visione della pillola.
    const viewedStrip = viewed ? (
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1 bg-teal-500 text-sm text-white">
        <FbCheckCircleSolid className="h-4 w-3" /> <p>vista</p>
      </div>
    ) : null;

    // costruzione parte superiore pillola.
    const thumbWithImg = thumbPath ? (
      <div className="relative flex h-44 w-full rounded-t-lg bg-white ">
        <img src={thumbPath} className="h-full w-full rounded-t-lg" />
        {viewedStrip}
      </div>
    ) : null;

    const thumbWithSvg = thumbSvg ? (
      <div className="flex h-44 w-full items-center justify-center rounded-t-lg bg-white group-hover:text-blue-700">
        {thumbSvg}
        {viewedStrip}
      </div>
    ) : null;

    const thumb = thumbWithImg ?? thumbWithSvg;

    return (
      <div
        ref={ref}
        key={id}
        className="group block h-80 w-64 flex-none rounded-lg border border-gray-200 bg-white text-center shadow hover:border-2 hover:border-blue-500"
      >
        <Link href={href ?? "javascript:void(0)"}>
          {thumb}
          <div className="h-full w-full">
            <h5 className="text-gray-90 mb-2 mt-4 text-2xl font-bold tracking-tight text-black group-hover:text-blue-700">
              {title}
            </h5>
            {description ? <p className="mt-4 text-lg text-gray-900">{description}</p> : null}
          </div>
        </Link>
      </div>
    );
  },
);
PillCard.displayName = "PillCard";

// ------------------------------------------------------------------------------------------------
