/**
 * src/frontend/features/pill/components/learner-list.tsx
 *
 * Componente che espone la lista delle pillole a cui il learner loggato è iscritto.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { apiClient } from "@/frontend/lib/trpc/client";
import { ErrorCard, LoadingBar } from "@/frontend/ui/status";
import { type PillPublicData } from "@/shared/features/pill/schema";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

// ------------------------------------------------------------------------------------------------

export const LearnerSubscribedPillList = (): React.JSX.Element => {
  // navigazione
  const router = useRouter();

  // chiamate api
  const learnerPills = apiClient.privatePill.list.useQuery();

  if (learnerPills.isLoading) return <LoadingBar />;
  if (learnerPills.error) return <ErrorCard error={learnerPills.error.message} />;

  if (learnerPills.data.length == 0) return <p>non hai nessuna pillola assegnata</p>;

  // funzione per esporre la card di una pillola.
  const showPillCard = (pill: PillPublicData): React.JSX.Element => {
    const viewPillLink = `/pill/${pill.id}`;
    const thumbPath = pill.thumbPath ? pill.thumbPath : "/default-thumb.png";

    return (
      <div
        key={pill.id}
        className="h-80 w-64 rounded-lg border border-gray-200 bg-white shadow hover:border-2 hover:border-blue-500 "
      >
        <Link href={viewPillLink}>
          <img src={thumbPath} className="h-44 w-full rounded-t-lg" />
          <div className="p-5">
            <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {pill.title}
            </h5>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="flex h-64 items-stretch justify-start gap-12">
        {learnerPills.data.map(showPillCard)}
      </div>
    </>
  );
};
