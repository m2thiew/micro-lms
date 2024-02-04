/**
 * src/frontend/ui/buttons.tsx
 *
 * Pulsanti con vari stili utilizzabili in giro per l'applicazione
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FbCirclePlusOutline, FbEditOutline, FbTrashBinOutline } from "./icons/flowbite";

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: React.JSX.Element;
};

// ------------------------------------------------------------------------------------------------

/**
 * Pulsante per l'azione "nuovo ...".
 */

export const NewButton = React.forwardRef<HTMLAnchorElement, ButtonProps>(
  (props, ref): React.JSX.Element => {
    const href = props.href ?? "#";
    const className = twMerge(
      props.className,
      "ml-2 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-lg font-medium text-white hover:cursor-pointer hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300",
    );

    const icon = props.icon ?? <FbCirclePlusOutline className="h-4 w-4" />;
    const children = props.children;

    return (
      <Link {...props} ref={ref} href={href} className={className}>
        {icon}
        {children}
      </Link>
    );
  },
);
NewButton.displayName = "NewButton";

// ------------------------------------------------------------------------------------------------

/**
 * Pulsante per l'azione "modifica ...".
 */

export const EditButton = React.forwardRef<HTMLAnchorElement, ButtonProps>(
  (props, ref): React.JSX.Element => {
    const href = props.href ?? "#";
    const className = twMerge(
      "ml-2 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-lg font-medium text-white hover:cursor-pointer hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200",
      props.className,
    );

    const icon = props.icon ?? <FbEditOutline className="h-4 w-4" />;
    const children = props.children;

    return (
      <Link {...props} ref={ref} href={href} className={className}>
        {icon}
        {children}
      </Link>
    );
  },
);
EditButton.displayName = "EditButton";

// ------------------------------------------------------------------------------------------------

/**
 * Pulsante per l'azione "elimina ...".
 */

export const DeleteButton = React.forwardRef<HTMLAnchorElement, ButtonProps>(
  (props, ref): React.JSX.Element => {
    const href = props.href ?? "#";
    const className = twMerge(
      "ml-2 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-lg font-medium text-white hover:cursor-pointer hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-400",
      props.className,
    );

    const icon = props.icon ?? <FbTrashBinOutline className="h-4 w-4" />;
    const children = props.children;

    return (
      <Link {...props} ref={ref} href={href} className={className}>
        {icon}
        {children}
      </Link>
    );
  },
);
DeleteButton.displayName = "DeleteButton";
