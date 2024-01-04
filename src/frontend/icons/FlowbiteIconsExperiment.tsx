/**
 * Esporta come componenti le icone disponibili su https://flowbite.com/icons/
 */

import clsx from "clsx";
import { forwardRef } from "react";

/**
 * Proprietà delle icone SVG.
 */

interface IIconProps extends React.SVGProps<SVGSVGElement> {}
type TIconRef = React.Ref<SVGSVGElement>;

// ------------------------------------------------------------------------------------------------

export const FbAddressBookSolid = forwardRef((props: IIconProps, ref: TIconRef) => {
  const { className, strokeWidth, ...otherProps } = props;

  return (
    <svg
      ref={ref}
      className={clsx(className, "h-6 w-6 text-gray-800 dark:text-white")}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 20"
      {...otherProps}
    >
      <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
    </svg>
  );
});

// ------------------------------------------------------------------------------------------------

export const FbAddressBookOutline = forwardRef((props: IIconProps, ref: TIconRef) => {
  const { className, strokeWidth, ...otherProps } = props;

  return (
    <svg
      ref={ref}
      className={clsx(className, "h-6 w-6 text-gray-800 dark:text-white")}
      {...otherProps}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ?? 2}
        d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
      />
    </svg>
  );
});
