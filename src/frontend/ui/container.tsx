/**
 * src/frontend/ui/container.tsx
 *
 * componenti che costituiscono il contenitore di altri componenti.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import React from "react";
import { twMerge } from "tailwind-merge";

// ------------------------------------------------------------------------------------------------

type DivProps = React.HTMLAttributes<HTMLDivElement>;

// ------------------------------------------------------------------------------------------------

/**
 * Contenitore principale di tutte le pagine.
 */
export const MainContainer = React.forwardRef<HTMLDivElement, DivProps>(
  (props, ref): React.JSX.Element => {
    const { className, children } = props;
    const mergedClassName = twMerge("mx-auto max-w-screen-xl p-4 text-gray-500", className);

    return (
      <main {...props} ref={ref} className={mergedClassName}>
        {children}
      </main>
    );
  },
);
MainContainer.displayName = "MainContainer";
