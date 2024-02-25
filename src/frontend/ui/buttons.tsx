/**
 * src/frontend/ui/buttons.tsx
 *
 * Pulsanti con vari stili utilizzabili in giro per l'applicazione
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FbCirclePlusOutline, FbEditOutline, FbTrashBinOutline } from "./icons/flowbite";

// ------------------------------------------------------------------------------------------------

type LinkWithIconProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: React.JSX.Element;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

// ------------------------------------------------------------------------------------------------

/**
 * Button primario
 */
export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref): React.JSX.Element => {
    const { className, children } = props;
    const mergedClassName = twMerge(
      "rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 ",
      className,
    );

    return (
      <button {...props} ref={ref} className={mergedClassName} type="button">
        {children}
      </button>
    );
  },
);
PrimaryButton.displayName = "PrimaryButton";

// ------------------------------------------------------------------------------------------------

/**
 * Button per azioni di "pericolo"
 */
export const DangerButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref): React.JSX.Element => {
    const { className, children } = props;
    const mergedClassName = twMerge(
      "rounded-lg bg-red-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 ",
      className,
    );

    return (
      <button {...props} ref={ref} className={mergedClassName} type="button">
        {children}
      </button>
    );
  },
);
DangerButton.displayName = "DangerButton";

// ------------------------------------------------------------------------------------------------

/**
 * Link primario
 */
export const PrimaryLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref): React.JSX.Element => {
    const { className, children, href } = props;
    const mergedClassName = twMerge(
      "rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300",
      className,
    );

    return (
      <Link
        {...props}
        href={href ?? "javascript:void(0)"}
        ref={ref}
        className={mergedClassName}
        role="button"
      >
        {children}
      </Link>
    );
  },
);
PrimaryLink.displayName = "PrimaryLink";

// ------------------------------------------------------------------------------------------------

/**
 * Link secondario
 */
export const SecondaryLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref): React.JSX.Element => {
    const { className, children, href } = props;
    const mergedClassName = twMerge(
      "rounded-lg bg-neutral-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-blue-300",
      className,
    );

    return (
      <Link
        {...props}
        href={href ?? "javascript:void(0)"}
        ref={ref}
        className={mergedClassName}
        role="button"
      >
        {children}
      </Link>
    );
  },
);
SecondaryLink.displayName = "SecondaryLink";

// ------------------------------------------------------------------------------------------------

/**
 * Link per l'azione "nuovo ...".
 */

export const NewLink = React.forwardRef<HTMLAnchorElement, LinkWithIconProps>(
  (props, ref): React.JSX.Element => {
    const href = props.href ?? "#";
    const className = twMerge(
      props.className,
      "ml-2 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-lg font-medium text-white hover:cursor-pointer hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300",
    );

    const icon = props.icon ?? <FbCirclePlusOutline className="h-4 w-4" />;
    const children = props.children;

    return (
      <Link {...props} ref={ref} href={href} className={className} role="button">
        {icon}
        {children}
      </Link>
    );
  },
);
NewLink.displayName = "NewLink";

// ------------------------------------------------------------------------------------------------

/**
 * Link per l'azione "modifica ...".
 */

export const EditLink = React.forwardRef<HTMLAnchorElement, LinkWithIconProps>(
  (props, ref): React.JSX.Element => {
    const href = props.href ?? "#";
    const className = twMerge(
      "ml-2 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-lg font-medium text-white hover:cursor-pointer hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200",
      props.className,
    );

    const icon = props.icon ?? <FbEditOutline className="h-4 w-4" />;
    const children = props.children;

    return (
      <Link {...props} ref={ref} href={href} className={className} role="button">
        {icon}
        {children}
      </Link>
    );
  },
);
EditLink.displayName = "EditLink";

// ------------------------------------------------------------------------------------------------

/**
 * Link per l'azione "elimina ...".
 */

export const DeleteLink = React.forwardRef<HTMLAnchorElement, LinkWithIconProps>(
  (props, ref): React.JSX.Element => {
    const href = props.href ?? "#";
    const className = twMerge(
      "ml-2 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-lg font-medium text-white hover:cursor-pointer hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-400",
      props.className,
    );

    const icon = props.icon ?? <FbTrashBinOutline className="h-4 w-4" />;
    const children = props.children;

    return (
      <Link {...props} ref={ref} href={href} className={className} role="button">
        {icon}
        {children}
      </Link>
    );
  },
);
DeleteLink.displayName = "DeleteLink";

// ------------------------------------------------------------------------------------------------

/**
 * Pulsante outline.
 */

export const OutlineButton = React.forwardRef<HTMLAnchorElement, LinkWithIconProps>(
  (props, ref): React.JSX.Element => {
    const href = props.href ?? "#";
    const className = twMerge(
      "inline-flex items-center px-5 py-2.5 text-lg font-medium  text-blue-600 hover:bg-gray-200 text-center rounded-lg",
      props.className,
    );

    const children = props.children;

    return (
      <Link {...props} ref={ref} href={href} className={className} role="button">
        {children}
      </Link>
    );
  },
);
OutlineButton.displayName = "OutlineButton";

// ------------------------------------------------------------------------------------------------

/**
 * Button di submit dei form
 */
export const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref): React.JSX.Element => {
    const { className, children } = props;
    const mergedClassName = twMerge(
      "w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-blue-200 ",
      className,
    );

    return (
      <button {...props} ref={ref} className={mergedClassName} type="submit">
        {children}
      </button>
    );
  },
);
SubmitButton.displayName = "SubmitButton";

// ------------------------------------------------------------------------------------------------

/**
 * Pulsante solido.
 */
export const SolidButton = React.forwardRef<HTMLAnchorElement, LinkWithIconProps>(
  (props, ref): React.JSX.Element => {
    const href = props.href ?? "#";
    const className = twMerge(
      "ml-2 rounded-lg bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 ",
      props.className,
    );

    const children = props.children;

    return (
      <Link {...props} ref={ref} href={href} className={className} role="button">
        {children}
      </Link>
    );
  },
);
SolidButton.displayName = "SolidButton";

// ------------------------------------------------------------------------------------------------
